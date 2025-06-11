import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Starting backup deletion handler...');
    
    // Initialize Supabase client
    const supabase = createServerSupabaseClient({ req, res });
    
    // Get user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) {
      console.error('Auth error:', authError);
      return res.status(401).json({ error: 'Unauthorized', details: authError });
    }
    if (!user) {
      console.error('No user found');
      return res.status(401).json({ error: 'No authenticated user found' });
    }

    // Check if user is admin
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Profile error:', profileError);
      return res.status(403).json({ error: 'Error checking user role', details: profileError });
    }
    if (!profile || profile.role !== 'admin') {
      console.error('User is not admin:', profile);
      return res.status(403).json({ error: 'User is not an admin' });
    }

    const { backupId } = req.query;
    if (!backupId || typeof backupId !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid backup ID' });
    }

    // Get backup details
    const { data: backup, error: fetchError } = await supabase
      .from('backups')
      .select('*')
      .eq('id', backupId)
      .single();

    if (fetchError) {
      console.error('Error fetching backup:', fetchError);
      return res.status(500).json({ error: 'Failed to fetch backup details', details: fetchError });
    }
    if (!backup) {
      return res.status(404).json({ error: 'Backup not found' });
    }

    // Delete the backup file from storage if it exists and backup is completed
    if (backup.status === 'completed' && backup.file_path) {
      const { error: storageError } = await supabase.storage
        .from('backups')
        .remove([backup.file_path]);

      if (storageError) {
        console.error('Error deleting backup file:', storageError);
        return res.status(500).json({ error: 'Failed to delete backup file', details: storageError });
      }
    }

    // Delete the backup record
    const { error: deleteError } = await supabase
      .from('backups')
      .delete()
      .eq('id', backupId);

    if (deleteError) {
      console.error('Error deleting backup record:', deleteError);
      return res.status(500).json({ error: 'Failed to delete backup record', details: deleteError });
    }

    return res.status(200).json({ message: 'Backup deleted successfully' });
  } catch (error: any) {
    console.error('Error in backup deletion API:', error);
    return res.status(500).json({
      error: 'Backup deletion failed',
      message: error?.message || 'An unknown error occurred',
      details: {
        name: error?.name || 'UnknownError',
        stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      }
    });
  }
} 