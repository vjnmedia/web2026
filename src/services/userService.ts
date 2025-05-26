import { supabase } from '@/lib/supabase';

export type UserRole = 'admin' | 'editor' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  user_id: string;
  theme: string;
  language: string;
  notifications_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export const userService = {
  // Get all users
  async getUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get a single user by ID
  async getUserById(id: string): Promise<User> {
    if (!id) {
      throw new Error('User ID is required');
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, name, role, avatar_url, created_at, updated_at')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new Error('User not found');
      }
      throw error;
    }

    if (!data) {
      throw new Error('No user data returned');
    }

    return data;
  },

  // Create a new user
  async createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const { data, error } = await supabase
      .from('profiles')
      .insert([user])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update a user
  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a user
  async deleteUser(id: string): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Get user preferences
  async getUserPreferences(userId: string): Promise<UserPreferences> {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      // If preferences don't exist, create default preferences
      if (error.code === 'PGRST116') {
        return this.createDefaultPreferences(userId);
      }
      throw error;
    }
    return data;
  },

  // Create default user preferences
  async createDefaultPreferences(userId: string): Promise<UserPreferences> {
    const defaultPreferences: Omit<UserPreferences, 'created_at' | 'updated_at'> = {
      user_id: userId,
      theme: 'system',
      language: 'en',
      notifications_enabled: true
    };

    const { data, error } = await supabase
      .from('user_preferences')
      .insert([defaultPreferences])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update user preferences
  async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    const { data, error } = await supabase
      .from('user_preferences')
      .update(preferences)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Upload user avatar
  async uploadAvatar(userId: string, file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Math.random()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('profiles')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('profiles')
      .getPublicUrl(filePath);

    return publicUrl;
  },

  // Delete user avatar
  async deleteAvatar(userId: string, avatarUrl: string): Promise<void> {
    const filePath = avatarUrl.split('/').pop();
    if (!filePath) return;

    const { error } = await supabase.storage
      .from('profiles')
      .remove([`avatars/${filePath}`]);

    if (error) throw error;
  }
}; 