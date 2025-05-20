import { SocialMediaPost } from '@/types/socialMedia';

// In a real implementation, these would be API endpoints
const API_BASE_URL = '/api';

export const socialMediaService = {
  // Twitter posts
  async getTwitterPosts(): Promise<SocialMediaPost[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/twitter-posts`);
      if (!response.ok) throw new Error('Failed to fetch Twitter posts');
      return response.json();
    } catch (error) {
      console.error('Error fetching Twitter posts:', error);
      return [];
    }
  },

  async createTwitterPost(post: Omit<SocialMediaPost, 'id'>): Promise<SocialMediaPost> {
    try {
      const response = await fetch(`${API_BASE_URL}/twitter-posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      if (!response.ok) throw new Error('Failed to create Twitter post');
      return response.json();
    } catch (error) {
      console.error('Error creating Twitter post:', error);
      throw error;
    }
  },

  async updateTwitterPost(id: number, post: Partial<SocialMediaPost>): Promise<SocialMediaPost> {
    try {
      const response = await fetch(`${API_BASE_URL}/twitter-posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      if (!response.ok) throw new Error('Failed to update Twitter post');
      return response.json();
    } catch (error) {
      console.error('Error updating Twitter post:', error);
      throw error;
    }
  },

  async deleteTwitterPost(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/twitter-posts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete Twitter post');
    } catch (error) {
      console.error('Error deleting Twitter post:', error);
      throw error;
    }
  },

  // Instagram posts
  async getInstagramPosts(): Promise<SocialMediaPost[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/instagram-posts`);
      if (!response.ok) throw new Error('Failed to fetch Instagram posts');
      return response.json();
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
      return [];
    }
  },

  async createInstagramPost(post: Omit<SocialMediaPost, 'id'>): Promise<SocialMediaPost> {
    try {
      const response = await fetch(`${API_BASE_URL}/instagram-posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      if (!response.ok) throw new Error('Failed to create Instagram post');
      return response.json();
    } catch (error) {
      console.error('Error creating Instagram post:', error);
      throw error;
    }
  },

  async updateInstagramPost(id: number, post: Partial<SocialMediaPost>): Promise<SocialMediaPost> {
    try {
      const response = await fetch(`${API_BASE_URL}/instagram-posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      if (!response.ok) throw new Error('Failed to update Instagram post');
      return response.json();
    } catch (error) {
      console.error('Error updating Instagram post:', error);
      throw error;
    }
  },

  async deleteInstagramPost(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/instagram-posts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete Instagram post');
    } catch (error) {
      console.error('Error deleting Instagram post:', error);
      throw error;
    }
  },
}; 