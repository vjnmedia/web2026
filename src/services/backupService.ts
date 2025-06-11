import { supabase } from '@/lib/supabase';

export interface Backup {
  id: string;
  created_at: string;
  size: number;
  type: 'full' | 'partial';
  status: 'completed' | 'failed' | 'in_progress';
  file_path: string;
  created_by: string;
  metadata?: {
    tables?: string[];
    files?: string[];
    description?: string;
  };
}

export const backupService = {
  async getBackups(): Promise<Backup[]> {
    const { data, error } = await supabase
      .from('backups')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async createBackup(type: 'full' | 'partial' = 'full'): Promise<Backup> {
    try {
      console.log('Starting backup creation process...');
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('Error getting current user:', userError);
        throw userError;
      }
      if (!user) {
        throw new Error('No authenticated user found');
      }
      
      console.log('Creating backup record...');
      // First, create a backup record
      const { data: backup, error: createError } = await supabase
        .from('backups')
        .insert([{
          type,
          status: 'in_progress',
          created_by: user.id
        }])
        .select()
        .single();

      if (createError) {
        console.error('Error creating backup record:', createError);
        throw createError;
      }

      if (!backup) {
        throw new Error('No backup record created');
      }

      console.log('Backup record created:', backup.id);
      console.log('Triggering backup process...');

      // Trigger the backup process through the backend API
      const response = await fetch('/api/backup/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          backupId: backup.id,
          type
        }),
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch (parseError) {
        console.error('Error parsing API response:', parseError);
        throw new Error('Invalid response from backup API');
      }

      if (!response.ok) {
        const errorMessage = responseData?.message || responseData?.error || 'Failed to initiate backup process';
        console.error('Backup API error:', responseData);
        
        // Update backup status to failed
        await supabase
          .from('backups')
          .update({
            status: 'failed',
            metadata: {
              error: errorMessage,
              details: responseData?.details
            }
          })
          .eq('id', backup.id);
          
        throw new Error(errorMessage);
      }

      console.log('Backup process triggered successfully');
      return backup;
    } catch (error) {
      console.error('Error in createBackup:', error);
      throw error;
    }
  },

  async restoreBackup(backupId: string): Promise<void> {
    try {
      // First, validate the backup exists and is completed
      const { data: backup, error: fetchError } = await supabase
        .from('backups')
        .select('*')
        .eq('id', backupId)
        .single();

      if (fetchError) throw fetchError;
      if (!backup || backup.status !== 'completed') {
        throw new Error('Invalid backup or backup not completed');
      }

      // Trigger the restore process through the backend API
      const response = await fetch('/api/backup/restore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ backupId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to initiate restore process');
      }
    } catch (error) {
      console.error('Error restoring backup:', error);
      throw error;
    }
  },

  async deleteBackup(backupId: string): Promise<void> {
    try {
      console.log('Deleting backup:', backupId);
      
      // Call the delete API endpoint
      const response = await fetch(`/api/backup/delete?backupId=${backupId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch (parseError) {
        console.error('Error parsing API response:', parseError);
        throw new Error('Invalid response from backup API');
      }

      if (!response.ok) {
        const errorMessage = responseData?.message || responseData?.error || 'Failed to delete backup';
        console.error('Backup deletion error:', responseData);
        throw new Error(errorMessage);
      }

      console.log('Backup deleted successfully');
    } catch (error) {
      console.error('Error in deleteBackup:', error);
      throw error;
    }
  },

  async getBackupStatus(backupId: string): Promise<Backup> {
    const { data, error } = await supabase
      .from('backups')
      .select('*')
      .eq('id', backupId)
      .single();

    if (error) throw error;
    return data;
  },

  async downloadBackup(backupId: string): Promise<string> {
    try {
      // Get the backup details
      const { data: backup, error: fetchError } = await supabase
        .from('backups')
        .select('*')
        .eq('id', backupId)
        .single();

      if (fetchError) throw fetchError;
      if (!backup || !backup.file_path) {
        throw new Error('Backup file not found');
      }

      // Get a temporary download URL
      const { data: { signedUrl }, error: signError } = await supabase.storage
        .from('backups')
        .createSignedUrl(backup.file_path, 3600); // URL valid for 1 hour

      if (signError) throw signError;
      if (!signedUrl) throw new Error('Failed to generate download URL');

      return signedUrl;
    } catch (error) {
      console.error('Error generating backup download URL:', error);
      throw error;
    }
  }
}; 