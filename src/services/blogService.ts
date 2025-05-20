import axios from 'axios';

const API_URL = '/api/blog';

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  status: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const blogService = {
  // Get all blog posts
  getAllPosts: async (): Promise<BlogPost[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Get single blog post
  getPost: async (id: number): Promise<BlogPost> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  // Create new blog post
  createPost: async (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> => {
    const response = await axios.post(API_URL, post);
    return response.data;
  },

  // Update blog post
  updatePost: async (id: number, post: Partial<BlogPost>): Promise<BlogPost> => {
    const response = await axios.put(`${API_URL}/${id}`, post);
    return response.data;
  },

  // Delete blog post
  deletePost: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  }
}; 