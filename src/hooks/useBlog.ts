import { useState, useEffect } from 'react';
import { blogService, BlogPost } from '@/services/blogService';
import { toast } from 'react-hot-toast';

export const useBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await blogService.getAllPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch blog posts');
      toast.error('Failed to fetch blog posts');
    } finally {
      setLoading(false);
    }
  };

  // Create new post
  const createPost = async (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newPost = await blogService.createPost(post);
      setPosts(prev => [newPost, ...prev]);
      toast.success('Blog post created successfully');
      return newPost;
    } catch (err) {
      toast.error('Failed to create blog post');
      throw err;
    }
  };

  // Update post
  const updatePost = async (id: number, post: Partial<BlogPost>) => {
    try {
      const updatedPost = await blogService.updatePost(id, post);
      setPosts(prev => prev.map(p => p.id === id ? updatedPost : p));
      toast.success('Blog post updated successfully');
      return updatedPost;
    } catch (err) {
      toast.error('Failed to update blog post');
      throw err;
    }
  };

  // Delete post
  const deletePost = async (id: number) => {
    try {
      await blogService.deletePost(id);
      setPosts(prev => prev.filter(p => p.id !== id));
      toast.success('Blog post deleted successfully');
    } catch (err) {
      toast.error('Failed to delete blog post');
      throw err;
    }
  };

  // Load posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    refreshPosts: fetchPosts
  };
}; 