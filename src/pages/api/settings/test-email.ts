import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import nodemailer from 'nodemailer';

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

    const { smtp_host, smtp_port, smtp_user, smtp_password, smtp_secure } = req.body;

    if (!smtp_host || !smtp_port || !smtp_user || !smtp_password) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Create test transporter
    const transporter = nodemailer.createTransport({
      host: smtp_host,
      port: smtp_port,
      secure: smtp_secure,
      auth: {
        user: smtp_user,
        pass: smtp_password
      }
    });

    // Send test email
    await transporter.sendMail({
      from: smtp_user,
      to: smtp_user, // Send to the same email for testing
      subject: 'VJN Admin - Email Settings Test',
      text: 'This is a test email to verify your SMTP settings.',
      html: `
        <h1>Email Settings Test</h1>
        <p>This is a test email to verify your SMTP settings for Vision Jeunesse Nouvelle admin panel.</p>
        <p>If you received this email, your settings are working correctly!</p>
        <hr>
        <p><small>Sent from VJN Admin Panel</small></p>
      `
    });

    return res.status(200).json({ message: 'Test email sent successfully' });
  } catch (error: any) {
    console.error('Error testing email settings:', error);
    return res.status(500).json({ error: error.message });
  }
} 