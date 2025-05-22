import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/components/LanguageContext';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

interface Blog {
  id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  author: string;
  language: 'en' | 'fr';
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetchBlogPost();
    fetchLatestBlogs();
  }, [id, language]);

  const fetchBlogPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .eq('language', language)
        .single();

      if (error) {
        console.error('Error fetching blog post:', error);
        toast.error('Failed to fetch blog post');
        return;
      }

      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      toast.error('Failed to fetch blog post');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLatestBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('id, title, language') // Only fetch necessary fields
        .eq('language', language)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching latest blogs:', error);
        // No toast here, as it's less critical than the main blog post fetch
        return;
      }

      setLatestBlogs(data || []);
    } catch (error) {
      console.error('Error fetching latest blogs:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vjn-blue"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">
          {language === 'en' ? 'Blog post not found' : 'Article non trouvé'}
        </h1>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-vjn-blue font-semibold hover:text-vjn-light-blue transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          {language === 'en' ? 'Back to Home' : 'Retour à l\'accueil'}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Blog Content */}
        <div className="md:col-span-2">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-vjn-blue font-semibold hover:text-vjn-light-blue transition-colors mb-8"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            {language === 'en' ? 'Back to Home' : 'Retour à l\'accueil'}
          </button>

          <article className="max-w-4xl md:max-w-none mx-auto">
            {blog.image_url && (
              <div className="aspect-video relative mb-8 rounded-lg overflow-hidden">
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            
            <div className="flex items-center text-gray-600 mb-8">
              <span className="mr-4">{blog.author}</span>
              <span>{new Date(blog.created_at).toLocaleDateString()}</span>
            </div>

            {/* Render HTML content from the rich text editor */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1 space-y-8">
          {/* Related Posts */}
          <div className="border rounded-md p-4">
            <h3 className="text-xl font-bold mb-4">Related Posts</h3>
            {/* Placeholder for related posts list */}
            <p>Related posts will go here.</p>
          </div>

          {/* Categories */}
          <div className="border rounded-md p-4">
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            {/* Placeholder for categories list */}
            <p>Categories will go here.</p>
          </div>

          {/* Latest News */}
          <div className="border rounded-md p-4">
            <h3 className="text-xl font-bold mb-4">{language === 'en' ? 'Latest News' : 'Dernières nouvelles'}</h3>
            {
              latestBlogs.length > 0 ? (
                <ul>
                  {latestBlogs.map((latestBlog) => (
                    <li key={latestBlog.id} className="mb-2">
                      <button 
                        onClick={() => navigate(`/blog/${latestBlog.id}`)}
                        className="text-vjn-blue hover:underline"
                      >
                        {latestBlog.title}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{language === 'en' ? 'No latest news available.' : 'Aucune dernière nouvelle disponible.'}</p>
              )
            }
          </div>

          {/* Share */}
          <div className="border rounded-md p-4">
            <h3 className="text-xl font-bold mb-4">{language === 'en' ? 'Share This Post' : 'Partager cet article'}</h3>
            <div className="flex gap-2">
              {/* Placeholder Share Buttons */}
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                Facebook
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(blog.title)}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                Twitter
              </a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${encodeURIComponent(blog.title)}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                LinkedIn
              </a>
              {/* Add more share options as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost; 