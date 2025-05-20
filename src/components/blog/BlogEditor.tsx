import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Save, Eye, Image as ImageIcon, Calendar } from 'lucide-react';
import { BlogPostFormData, Category } from '@/types/blog';
import { lazy, Suspense } from 'react';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';

// Dynamically import the rich text editor to reduce initial bundle size
const RichTextEditor = lazy(() => import('@/components/RichTextEditor'));

const BlogEditor = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: '',
    content: '',
    excerpt: '',
    status: 'draft',
    tags: [],
    categories: [],
    scheduledFor: '',
    seoTitle: '',
    seoDescription: ''
  });

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/blog/categories', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast.error('Failed to load categories');
      console.error(error);
    }
  };

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/blog/posts/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch post');
      const post = await response.json();
      setFormData({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        status: post.status,
        tags: post.tags,
        categories: post.categories.map((c: Category) => c.id),
        scheduledFor: post.scheduledFor || '',
        seoTitle: post.seoTitle || '',
        seoDescription: post.seoDescription || ''
      });
    } catch (error) {
      toast.error('Failed to load post');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = id ? `/api/blog/posts/${id}` : '/api/blog/posts';
      const method = id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save post');

      const post = await response.json();
      toast.success(`Post ${id ? 'updated' : 'created'} successfully`);
      navigate(`/blog/${post.slug}`);
    } catch (error) {
      toast.error(`Failed to ${id ? 'update' : 'create'} post`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');

      const { url } = await response.json();
      setFormData(prev => ({ ...prev, featuredImage: url }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
    }
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
      }
      e.currentTarget.value = '';
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="container-custom py-8">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              placeholder="Enter post title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              required
              placeholder="Enter post excerpt"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <Suspense fallback={<div>Loading editor...</div>}>
              <RichTextEditor
                value={formData.content}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
              />
            </Suspense>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Categories</Label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(category.id)}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          categories: e.target.checked
                            ? [...prev.categories, category.id]
                            : prev.categories.filter(id => id !== category.id)
                        }));
                      }}
                      className="rounded border-gray-300"
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Add tags (press Enter)"
                  onKeyDown={handleTagInput}
                />
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 rounded-full text-sm flex items-center"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Featured Image</Label>
            <div className="flex items-center space-x-4">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
                className="hidden"
                id="image-upload"
              />
              <Label
                htmlFor="image-upload"
                className="cursor-pointer flex items-center space-x-2 px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                <ImageIcon className="h-4 w-4" />
                <span>Upload Image</span>
              </Label>
              {formData.featuredImage && (
                <img
                  src={formData.featuredImage}
                  alt="Featured"
                  className="h-20 w-20 object-cover rounded-md"
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="seoTitle">SEO Title</Label>
              <Input
                id="seoTitle"
                value={formData.seoTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                placeholder="Enter SEO title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seoDescription">SEO Description</Label>
              <Textarea
                id="seoDescription"
                value={formData.seoDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                placeholder="Enter SEO description"
                rows={3}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="scheduledFor">Schedule Publication</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="datetime-local"
                id="scheduledFor"
                value={formData.scheduledFor}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    scheduledFor: e.target.value,
                    status: e.target.value ? 'scheduled' : prev.status
                  }));
                }}
              />
              {formData.scheduledFor && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setFormData(prev => ({ ...prev, scheduledFor: '' }))}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-4">
              <Button
                type="submit"
                disabled={isLoading}
                onClick={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
                className="bg-vjn-blue hover:bg-vjn-light-blue"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save as Draft
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                onClick={() => setFormData(prev => ({ ...prev, status: 'published' }))}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Eye className="h-4 w-4 mr-2" />
                )}
                {formData.scheduledFor ? 'Schedule' : 'Publish'}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default BlogEditor; 