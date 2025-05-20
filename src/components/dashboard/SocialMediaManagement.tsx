import React, { useState, useEffect } from 'react';
import { Twitter, Instagram, Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { useSocialMedia } from '@/hooks/useSocialMedia';
import { SocialMediaPost } from '@/types/socialMedia';
import { toast } from 'react-hot-toast';

const SocialMediaManagement: React.FC = () => {
  const {
    twitterPosts,
    instagramPosts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    uploadImage,
  } = useSocialMedia();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<SocialMediaPost | null>(null);
  const [activeTab, setActiveTab] = useState('twitter');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleAddPost = () => {
    setEditingPost(null);
    setUploadedImageUrl(null);
    setIsDialogOpen(true);
  };

  const handleEditPost = (post: SocialMediaPost) => {
    setEditingPost(post);
    setUploadedImageUrl(post.image || null);
    setIsDialogOpen(true);
  };

  const handleDeletePost = async (postId: number, platform: 'twitter' | 'instagram') => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(postId, platform);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const url = await uploadImage(file);
      setUploadedImageUrl(url);
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  const handleSavePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const postData: Partial<SocialMediaPost> = {
      content: formData.get('content') as string,
      caption: formData.get('caption') as string,
      date: formData.get('date') as string,
      likes: parseInt(formData.get('likes') as string),
      author: formData.get('author') as string,
      authorHandle: formData.get('authorHandle') as string,
      authorImage: formData.get('authorImage') as string,
    };

    if (activeTab === 'twitter') {
      postData.retweets = parseInt(formData.get('retweets') as string);
    } else {
      postData.comments = parseInt(formData.get('comments') as string);
      postData.image = uploadedImageUrl || editingPost?.image;
    }

    try {
      if (editingPost) {
        await updatePost(editingPost.id, postData, activeTab as 'twitter' | 'instagram');
      } else {
        await createPost(postData as Omit<SocialMediaPost, 'id'>, activeTab as 'twitter' | 'instagram');
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Failed to save post:', error);
    }
  };

  if (loading && !twitterPosts.length && !instagramPosts.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vjn-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">Error</p>
          <p>{error}</p>
          <Button onClick={() => fetchPosts()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Social Media Management</h2>
        <Button onClick={handleAddPost} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Post
        </Button>
      </div>

      <Tabs defaultValue="twitter" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="twitter" className="flex items-center gap-2">
            <Twitter className="h-4 w-4" />
            Twitter Posts
          </TabsTrigger>
          <TabsTrigger value="instagram" className="flex items-center gap-2">
            <Instagram className="h-4 w-4" />
            Instagram Posts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="twitter">
          <div className="grid gap-4">
            {twitterPosts.map((post) => (
              <div key={post.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <img src={post.authorImage} alt={post.author} className="w-10 h-10 rounded-full" />
                    <div>
                      <h3 className="font-semibold">{post.author}</h3>
                      <p className="text-sm text-gray-500">{post.authorHandle}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeletePost(post.id, 'twitter')}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{post.content}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.likes} likes</span>
                  <span>•</span>
                  <span>{post.retweets} retweets</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="instagram">
          <div className="grid gap-4">
            {instagramPosts.map((post) => (
              <div key={post.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="aspect-square w-24 overflow-hidden rounded-lg">
                    <img src={post.image} alt="Post" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeletePost(post.id, 'instagram')}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{post.caption}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.likes} likes</span>
                  <span>•</span>
                  <span>{post.comments} comments</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]" aria-describedby="dialog-description">
          <DialogHeader>
            <DialogTitle>{editingPost ? 'Edit Post' : 'Add New Post'}</DialogTitle>
            <DialogDescription id="dialog-description">
              {editingPost ? 'Edit the details of your social media post.' : 'Create a new social media post.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSavePost}>
            <div className="grid gap-4 py-4">
              {activeTab === 'twitter' ? (
                <>
                  <div className="grid gap-2">
                    <label htmlFor="author">Author Name</label>
                    <Input
                      id="author"
                      name="author"
                      defaultValue={editingPost?.author}
                      placeholder="Enter author name"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="authorHandle">Author Handle</label>
                    <Input
                      id="authorHandle"
                      name="authorHandle"
                      defaultValue={editingPost?.authorHandle || '@visionjeunesse2'}
                      placeholder="@visionjeunesse2"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="content">Content</label>
                    <Textarea
                      id="content"
                      name="content"
                      defaultValue={editingPost?.content}
                      placeholder="Enter post content"
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid gap-2">
                    <label>Image</label>
                    <ImageUpload
                      onUpload={handleImageUpload}
                      currentImage={editingPost?.image}
                      maxSizeMB={5}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="caption">Caption</label>
                    <Textarea
                      id="caption"
                      name="caption"
                      defaultValue={editingPost?.caption}
                      placeholder="Enter post caption"
                      required
                    />
                  </div>
                </>
              )}
              <div className="grid gap-2">
                <label htmlFor="date">Date</label>
                <Input
                  id="date"
                  name="date"
                  defaultValue={editingPost?.date}
                  placeholder="e.g., 2 hours ago"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="likes">Likes</label>
                <Input
                  id="likes"
                  name="likes"
                  type="number"
                  defaultValue={editingPost?.likes}
                  placeholder="Enter number of likes"
                  required
                />
              </div>
              {activeTab === 'twitter' ? (
                <div className="grid gap-2">
                  <label htmlFor="retweets">Retweets</label>
                  <Input
                    id="retweets"
                    name="retweets"
                    type="number"
                    defaultValue={editingPost?.retweets}
                    placeholder="Enter number of retweets"
                    required
                  />
                </div>
              ) : (
                <div className="grid gap-2">
                  <label htmlFor="comments">Comments</label>
                  <Input
                    id="comments"
                    name="comments"
                    type="number"
                    defaultValue={editingPost?.comments}
                    placeholder="Enter number of comments"
                    required
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocialMediaManagement;
