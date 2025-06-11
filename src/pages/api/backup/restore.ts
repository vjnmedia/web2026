import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { restoreBackup } from '@/lib/backup';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Initialize Supabase client
    const supabase = createServerSupabaseClient({ req, res });

    // Get user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if user is admin
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || !profile || profile.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { backupId } = req.body;
    if (!backupId) {
      return res.status(400).json({ error: 'Missing backup ID' });
    }

    // Get backup details
    const { data: backup, error: backupError } = await supabase
      .from('backups')
      .select('*')
      .eq('id', backupId)
      .single();

    if (backupError || !backup) {
      return res.status(404).json({ error: 'Backup not found' });
    }

    if (backup.status !== 'completed') {
      return res.status(400).json({ error: 'Backup is not in completed state' });
    }

    // Start restore process
    await restoreBackup(backupId, user.id);

    return res.status(200).json({ message: 'Restore process started' });
  } catch (error: any) {
    console.error('Error in backup restoration:', error);
    return res.status(500).json({ error: error.message });
  }
} 