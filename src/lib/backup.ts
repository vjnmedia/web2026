import { supabase } from './supabase';
import JSZip from 'jszip';

// Tables to backup
const TABLES_TO_BACKUP = [
  'profiles',
  'pages',
  'posts',
  'events',
  'projects',
  'teams',
  'locations',
  'system_settings'
];

// Storage buckets to backup
const BUCKETS_TO_BACKUP = [
  'avatars',
  'media',
  'documents'
];

export async function createBackup(backupId: string, type: 'full' | 'partial', userId: string) {
  try {
    console.log('Starting backup creation in lib/backup...');
    console.log('Parameters:', { backupId, type, userId });

    // Update backup status to in_progress
    console.log('Updating backup status to in_progress...');
    const { error: updateError } = await supabase
      .from('backups')
      .update({ status: 'in_progress' })
      .eq('id', backupId);

    if (updateError) {
      console.error('Error updating backup status:', updateError);
      throw updateError;
    }

    const zip = new JSZip();
    const timestamp = new Date().toISOString();
    console.log('Created zip instance with timestamp:', timestamp);

    // Backup database tables
    console.log('Starting database backup...');
    const tablesData: Record<string, any[]> = {};
    for (const table of TABLES_TO_BACKUP) {
      console.log(`Backing up table: ${table}`);
      const { data, error } = await supabase
        .from(table)
        .select('*');

      if (error) {
        console.error(`Error backing up table ${table}:`, error);
        throw error;
      }
      tablesData[table] = data || [];
      console.log(`Table ${table} backed up: ${data?.length || 0} rows`);
    }

    // Add tables data to zip
    console.log('Adding tables data to zip...');
    zip.file('tables.json', JSON.stringify(tablesData, null, 2));

    // Backup storage files
    console.log('Starting storage backup...');
    for (const bucket of BUCKETS_TO_BACKUP) {
      console.log(`Processing bucket: ${bucket}`);
      const { data: files, error } = await supabase.storage
        .from(bucket)
        .list();

      if (error) {
        console.error(`Error listing files in bucket ${bucket}:`, error);
        throw error;
      }

      if (files && files.length > 0) {
        console.log(`Found ${files.length} files in bucket ${bucket}`);
        const bucketZip = zip.folder(bucket);
        if (!bucketZip) {
          console.error(`Failed to create zip folder for bucket ${bucket}`);
          continue;
        }

        for (const file of files) {
          console.log(`Downloading file: ${file.name}`);
          const { data: fileData, error: downloadError } = await supabase.storage
            .from(bucket)
            .download(file.name);

          if (downloadError) {
            console.error(`Error downloading file ${file.name}:`, downloadError);
            continue;
          }
          if (!fileData) {
            console.error(`No data received for file ${file.name}`);
            continue;
          }

          bucketZip.file(file.name, fileData);
          console.log(`File ${file.name} added to backup`);
        }
      } else {
        console.log(`No files found in bucket ${bucket}`);
      }
    }

    // Generate zip file
    console.log('Generating zip file...');
    const content = await zip.generateAsync({ type: 'blob' });
    const filePath = `backups/${backupId}-${timestamp}.zip`;
    console.log('Zip file generated:', { size: content.size, path: filePath });

    // Upload zip to storage
    console.log('Uploading backup to storage...');
    const { error: uploadError } = await supabase.storage
      .from('backups')
      .upload(filePath, content);

    if (uploadError) {
      console.error('Error uploading backup:', uploadError);
      throw uploadError;
    }
    console.log('Backup file uploaded successfully');

    // Update backup record
    console.log('Updating backup record...');
    const { error: finalUpdateError } = await supabase
      .from('backups')
      .update({
        status: 'completed',
        file_path: filePath,
        size: content.size,
        metadata: {
          tables: TABLES_TO_BACKUP,
          buckets: BUCKETS_TO_BACKUP,
          timestamp
        }
      })
      .eq('id', backupId);

    if (finalUpdateError) {
      console.error('Error updating backup record:', finalUpdateError);
      throw finalUpdateError;
    }
    console.log('Backup completed successfully');

  } catch (error) {
    console.error('Error in createBackup:', error);
    
    // Update backup status to failed
    try {
      await supabase
        .from('backups')
        .update({
          status: 'failed',
          metadata: {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
          }
        })
        .eq('id', backupId);
    } catch (updateError) {
      console.error('Error updating backup status to failed:', updateError);
    }

    throw error;
  }
}

export async function restoreBackup(backupId: string, userId: string) {
  try {
    // Get backup details
    const { data: backup, error: backupError } = await supabase
      .from('backups')
      .select('*')
      .eq('id', backupId)
      .single();

    if (backupError || !backup) throw new Error('Backup not found');

    // Download backup file
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('backups')
      .download(backup.file_path);

    if (downloadError || !fileData) throw new Error('Failed to download backup file');

    // Extract zip
    const zip = new JSZip();
    const contents = await zip.loadAsync(fileData);

    // Restore database tables
    const tablesJson = await contents.file('tables.json')?.async('string');
    if (tablesJson) {
      const tables = JSON.parse(tablesJson);
      
      for (const [table, data] of Object.entries(tables)) {
        // Skip if table doesn't exist in backup
        if (!TABLES_TO_BACKUP.includes(table)) continue;

        // Delete existing data
        await supabase.from(table).delete().neq('id', 0);

        // Insert backup data
        if (Array.isArray(data) && data.length > 0) {
          const { error } = await supabase.from(table).insert(data);
          if (error) throw error;
        }
      }
    }

    // Restore storage files
    for (const bucket of BUCKETS_TO_BACKUP) {
      const bucketFolder = contents.folder(bucket);
      if (!bucketFolder) continue;

      // Delete existing files in bucket
      const { data: existingFiles } = await supabase.storage
        .from(bucket)
        .list();

      if (existingFiles) {
        for (const file of existingFiles) {
          await supabase.storage
            .from(bucket)
            .remove([file.name]);
        }
      }

      // Upload backup files
      const files = bucketFolder.files;
      for (const [path, file] of Object.entries(files)) {
        const content = await file.async('blob');
        await supabase.storage
          .from(bucket)
          .upload(path, content);
      }
    }

    return true;
  } catch (error) {
    console.error('Error restoring backup:', error);
    throw error;
  }
} 