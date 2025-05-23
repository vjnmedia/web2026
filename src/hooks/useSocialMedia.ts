import { useState, useEffect } from 'react';
import { SocialMediaPost } from '@/types/socialMedia';
import { mockPosts } from '@/data/mockPosts';

export const useSocialMedia = () => {
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPosts(mockPosts);
      setError(null);
    } catch (err) {
      setError('Failed to fetch posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    twitterPosts: posts,
    loading,
    error,
    fetchPosts
  };
}; 