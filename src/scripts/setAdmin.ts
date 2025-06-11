import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rmlykvyagyjyccnunmqh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtbHlrdnlhZ3lqeWNjbnVubXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0Nzc2MzQsImV4cCI6MjA2MzA1MzYzNH0.K7DYXnq3-AvbKBDDiImJeKfQWSNBmor_AabJ3aeTLj4'
);

async function setAdminUser() {
  try {
    // Update or insert admin user
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: '8158316f-1317-418c-88f7-b50940ec2554',
        email: 'niyitegek@gmail.com',
        name: 'Admin',
        role: 'admin'
      })
      .select()
      .single();

    if (error) {
      console.error('Error setting admin user:', error);
      return;
    }

    console.log('Admin user set successfully:', data);
  } catch (error) {
    console.error('Error in setAdminUser:', error);
  }
}

setAdminUser(); 