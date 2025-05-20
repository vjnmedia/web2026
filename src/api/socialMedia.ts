import { SocialMediaPost } from '@/types/socialMedia';
import { APIError } from '@/types/errors';
import { mockApi } from './mockServer';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export class ApiService {
  private static async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new APIError(`API request failed: ${response.statusText}`, response.status);
      }

      return response.json();
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError('Network error occurred', 0);
    }
  }

  // Twitter Posts
  static async getTwitterPosts(): Promise<SocialMediaPost[]> {
    try {
      return await mockApi.getTwitterPosts();
    } catch (error) {
      console.error('Error fetching Twitter posts:', error);
      throw error;
    }
  }

  // Instagram Posts
  static async getInstagramPosts(): Promise<SocialMediaPost[]> {
    try {
      return await mockApi.getInstagramPosts();
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
      throw error;
    }
  }

  // Add Post
  static async addPost(post: Omit<SocialMediaPost, 'id'>): Promise<SocialMediaPost> {
    try {
      return await mockApi.addPost(post);
    } catch (error) {
      console.error('Error adding post:', error);
      throw error;
    }
  }

  // Update Post
  static async updatePost(id: string, post: Partial<SocialMediaPost>): Promise<SocialMediaPost> {
    try {
      return await mockApi.updatePost(id, post);
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  }

  // Delete Post
  static async deletePost(id: string): Promise<void> {
    try {
      await mockApi.deletePost(id);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }

  // Upload Image
  static async uploadImage(file: File): Promise<{ url: string }> {
    try {
      // For development, we'll simulate a successful upload
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setTimeout(() => {
            resolve({ url: reader.result as string });
          }, 1000);
        };
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
} 