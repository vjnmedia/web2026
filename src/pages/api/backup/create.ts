import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { createBackup } from '@/lib/backup';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Starting backup API handler...');
    
    // Initialize Supabase client
    const supabase = createServerSupabaseClient({ req, res });
    console.log('Supabase client initialized');

    // Get user
    console.log('Getting user...');
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) {
      console.error('Auth error:', authError);
      return res.status(401).json({ error: 'Unauthorized', details: authError });
    }
    if (!user) {
      console.error('No user found');
      return res.status(401).json({ error: 'No authenticated user found' });
    }
    console.log('User found:', user.id);

    // Check if user is admin
    console.log('Checking admin status...');
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
    console.log('Admin status confirmed');

    const { backupId, type } = req.body;
    if (!backupId || !type) {
      console.error('Missing parameters:', { backupId, type });
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    console.log('Starting backup process for:', { backupId, type });

    // Start backup process
    await createBackup(backupId, type, user.id);
    console.log('Backup process completed successfully');

    return res.status(200).json({ message: 'Backup process started' });
  } catch (error: any) {
    console.error('Error in backup creation API:', error);
    
    // Ensure we have a properly formatted error response
    const errorResponse = {
      error: 'Backup creation failed',
      message: error?.message || 'An unknown error occurred',
      details: {
        name: error?.name || 'UnknownError',
        stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      }
    };
    
    return res.status(500).json(errorResponse);
  }
} 