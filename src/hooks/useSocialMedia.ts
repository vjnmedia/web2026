import { useState, useCallback } from 'react';
import { SocialMediaPost } from '@/types/socialMedia';
import { ApiService } from '@/api/socialMedia';
import { toast } from 'react-hot-toast';

interface UseSocialMediaReturn {
  twitterPosts: SocialMediaPost[];
  instagramPosts: SocialMediaPost[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  createPost: (post: Omit<SocialMediaPost, 'id'>, platform: 'twitter' | 'instagram') => Promise<void>;
  updatePost: (id: string, post: Partial<SocialMediaPost>, platform: 'twitter' | 'instagram') => Promise<void>;
  deletePost: (id: string, platform: 'twitter' | 'instagram') => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
}

export const useSocialMedia = (): UseSocialMediaReturn => {
  const [twitterPosts, setTwitterPosts] = useState<SocialMediaPost[]>([]);
  const [instagramPosts, setInstagramPosts] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [twitter, instagram] = await Promise.all([
        ApiService.getTwitterPosts(),
        ApiService.getInstagramPosts()
      ]);
      setTwitterPosts(twitter);
      setInstagramPosts(instagram);
    } catch (err) {
      setError('Failed to fetch posts');
      toast.error('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = useCallback(async (post: Omit<SocialMediaPost, 'id'>, platform: 'twitter' | 'instagram') => {
    try {
      setLoading(true);
      const newPost = await ApiService.addPost(post);
      if (platform === 'twitter') {
        setTwitterPosts(prev => [...prev, newPost]);
      } else {
        setInstagramPosts(prev => [...prev, newPost]);
      }
      toast.success('Post created successfully');
    } catch (err) {
      toast.error('Failed to create post');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePost = useCallback(async (id: string, post: Partial<SocialMediaPost>, platform: 'twitter' | 'instagram') => {
    try {
      setLoading(true);
      const updatedPost = await ApiService.updatePost(id, post);
      if (platform === 'twitter') {
        setTwitterPosts(prev => prev.map(p => p.id === id ? updatedPost : p));
      } else {
        setInstagramPosts(prev => prev.map(p => p.id === id ? updatedPost : p));
      }
      toast.success('Post updated successfully');
    } catch (err) {
      toast.error('Failed to update post');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePost = useCallback(async (id: string, platform: 'twitter' | 'instagram') => {
    try {
      setLoading(true);
      await ApiService.deletePost(id);
      if (platform === 'twitter') {
        setTwitterPosts(prev => prev.filter(p => p.id !== id));
      } else {
        setInstagramPosts(prev => prev.filter(p => p.id !== id));
      }
      toast.success('Post deleted successfully');
    } catch (err) {
      toast.error('Failed to delete post');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    try {
      setLoading(true);
      const result = await ApiService.uploadImage(file);
      return result.url;
    } catch (err) {
      toast.error('Failed to upload image');
      throw err;
    } finally {
      setLoading(false);
    }
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