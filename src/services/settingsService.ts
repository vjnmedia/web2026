import { supabase } from '@/lib/supabase';

export interface SystemSettings {
  id?: string;
  site_name: string;
  site_description: string;
  maintenance_mode: boolean;
  default_language: string;
  theme: string;
  email_notifications: boolean;
  backup_frequency: string;
  security_level: string;
  api_enabled: boolean;
  cache_enabled: boolean;
  log_retention: number;
  smtp_host?: string;
  smtp_port?: number;
  smtp_user?: string;
  smtp_secure?: boolean;
  updated_at?: string;
}

export const settingsService = {
  async getSettings(): Promise<SystemSettings> {
    const { data, error } = await supabase
      .from('system_settings')
      .select('*')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // If no settings exist, create default settings
        return this.createDefaultSettings();
      }
      throw error;
    }

    return data;
  },

  async updateSettings(settings: Partial<SystemSettings>): Promise<SystemSettings> {
    const { data, error } = await supabase
      .from('system_settings')
      .update(settings)
      .eq('id', 1) // We always use ID 1 for system settings
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async createDefaultSettings(): Promise<SystemSettings> {
    const defaultSettings: Omit<SystemSettings, 'id'> = {
      site_name: 'Vision Jeunesse Nouvelle',
      site_description: 'Empowering youth for a better future',
      maintenance_mode: false,
      default_language: 'en',
      theme: 'light',
      email_notifications: true,
      backup_frequency: 'daily',
      security_level: 'high',
      api_enabled: false,
      cache_enabled: true,
      log_retention: 30
    };

    const { data, error } = await supabase
      .from('system_settings')
      .insert([defaultSettings])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateEmailSettings(settings: {
    smtp_host: string;
    smtp_port: number;
    smtp_user: string;
    smtp_secure: boolean;
  }): Promise<void> {
    const { error } = await supabase
      .from('system_settings')
      .update(settings)
      .eq('id', 1);

    if (error) throw error;
  },

  async testEmailSettings(settings: {
    smtp_host: string;
    smtp_port: number;
    smtp_user: string;
    smtp_password: string;
    smtp_secure: boolean;
  }): Promise<boolean> {
    try {
      const response = await fetch('/api/settings/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error('Failed to test email settings');
      }

      return true;
    } catch (error) {
      console.error('Error testing email settings:', error);
      throw error;
    }
  }
}; 