import { supabase } from '@/lib/supabase';

export interface UploadResult {
  url: string;
  path: string;
}

export const imageUploadService = {
  // Upload image to Supabase storage
  async uploadImage(file: File, bucket: string = 'slider'): Promise<UploadResult> {
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Determine folder based on bucket
      let folder = 'slider';
      if (bucket === 'events') {
        folder = 'events';
      } else if (bucket === 'profiles') {
        folder = 'profiles';
      } else if (bucket === 'backups') {
        folder = 'backups';
      }
      
      const filePath = `${folder}/${fileName}`;

      // Upload to Supabase
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw new Error(`Upload failed: ${error.message}`);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return {
        url: publicUrl,
        path: filePath
      };
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('Failed to upload image');
    }
  },

  // Delete image from Supabase storage
  async deleteImage(path: string, bucket: string = 'slider'): Promise<void> {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) {
        console.error('Image deletion error:', error);
        // Don't throw error for deletion failures as the image might not exist
      }
    } catch (error) {
      console.error('Image deletion error:', error);
    }
  },

  // Generate placeholder avatar URL
  generatePlaceholderAvatar(name: string): string {
    const initials = name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
    
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=3b82f6&color=ffffff&size=150&bold=true`;
  },

  // Validate image file
  validateImageFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Please upload a valid image file (JPEG, PNG, or WebP)'
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'Image size must be less than 5MB'
      };
    }

    return { valid: true };
  }
};
