import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface SocialMediaPost {
  id: number;
  platform: 'twitter' | 'instagram';
  content: string;
  image?: string;
  scheduledAt?: string;
  publishedAt?: string;
  status: 'draft' | 'scheduled' | 'published';
  createdAt: string;
  updatedAt: string;
}

export const useSocialMedia = () => {
  const [twitterPosts, setTwitterPosts] = useState<SocialMediaPost[]>([]);
  const [instagramPosts, setInstagramPosts] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock data for now - replace with actual API calls
      const mockTwitterPosts: SocialMediaPost[] = [
        {
          id: 1,
          platform: 'twitter',
          content: 'Exciting news! Our latest peacebuilding initiative is making a real difference in the community. #PeaceBuilding #CommunityImpact',
          status: 'published',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
        },
        {
          id: 2,
          platform: 'twitter',
          content: 'Join us for our upcoming sports event this weekend! 🏃‍♂️ #Sports #Community',
          status: 'scheduled',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        }
      ];

      const mockInstagramPosts: SocialMediaPost[] = [
        {
          id: 3,
          platform: 'instagram',
          content: 'Beautiful moments from our latest community event! ✨ #Community #Impact',
          image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500',
          status: 'published',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
        }
      ];

      setTwitterPosts(mockTwitterPosts);
      setInstagramPosts(mockInstagramPosts);
    } catch (err) {
      setError('Failed to fetch social media posts');
      toast.error('Failed to fetch social media posts');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (post: Omit<SocialMediaPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newPost: SocialMediaPost = {
        ...post,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (post.platform === 'twitter') {
        setTwitterPosts(prev => [newPost, ...prev]);
      } else {
        setInstagramPosts(prev => [newPost, ...prev]);
      }

      toast.success('Post created successfully');
      return newPost;
    } catch (err) {
      toast.error('Failed to create post');
      throw err;
    }
  };

  const updatePost = async (id: number, platform: 'twitter' | 'instagram', updates: Partial<SocialMediaPost>) => {
    try {
      const updatedPost = { ...updates, updatedAt: new Date().toISOString() };

      if (platform === 'twitter') {
        setTwitterPosts(prev => prev.map(post => 
          post.id === id ? { ...post, ...updatedPost } : post
        ));
      } else {
        setInstagramPosts(prev => prev.map(post => 
          post.id === id ? { ...post, ...updatedPost } : post
        ));
      }

      toast.success('Post updated successfully');
    } catch (err) {
      toast.error('Failed to update post');
      throw err;
    }
  };

  const deletePost = async (id: number, platform: 'twitter' | 'instagram') => {
    try {
      if (platform === 'twitter') {
        setTwitterPosts(prev => prev.filter(post => post.id !== id));
      } else {
        setInstagramPosts(prev => prev.filter(post => post.id !== id));
      }

      toast.success('Post deleted successfully');
    } catch (err) {
      toast.error('Failed to delete post');
      throw err;
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      // Mock image upload - replace with actual implementation
      const mockUrl = URL.createObjectURL(file);
      toast.success('Image uploaded successfully');
      return mockUrl;
    } catch (err) {
      toast.error('Failed to upload image');
      throw err;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    twitterPosts,
    instagramPosts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    uploadImage,
  };
};