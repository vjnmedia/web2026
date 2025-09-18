import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, Facebook, Twitter, Linkedin, Copy, Printer } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/components/LanguageContext';
import { toast } from 'sonner';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  author: string;
  language: 'en' | 'fr';
}

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchPost();
    fetchLatestPosts();
    fetchCategories();
    // Check if post is bookmarked
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(Number(id)));
  }, [id, language]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .eq('language', language)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      toast.error(t('blog.error', 'Failed to load blog post'));
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('id, title')
        .eq('language', language)
        .order('created_at', { ascending: false })
        .limit(5);
      if (!error && data) setLatestPosts(data);
    } catch {}
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('category')
        .eq('language', language);
      if (!error && data) {
        const cats = Array.from(new Set(data.map((b: any) => b.category).filter(Boolean)));
        setCategories(cats);
      }
    } catch {}
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: post?.title,
        text: post?.content.substring(0, 200),
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (isBookmarked) {
      const newBookmarks = bookmarks.filter((b: number) => b !== Number(id));
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      setIsBookmarked(false);
      toast.success(t('blog.unbookmarked', 'Post removed from bookmarks'));
    } else {
      bookmarks.push(Number(id));
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      setIsBookmarked(true);
      toast.success(t('blog.bookmarked', 'Post added to bookmarks'));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(t('blog.copied', 'Link copied!'));
  };

  const renderFormattedContent = (content: string) => {
    // Remove HTML tags but keep paragraphs and blockquotes
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const paragraphs = Array.from(tempDiv.querySelectorAll('p, blockquote, h2, h3, h4, ul, ol'));
    if (paragraphs.length === 0) return <div>{tempDiv.textContent}</div>;
    return (
      <div>
        {paragraphs.map((el, idx) => {
          if (el.tagName === 'BLOCKQUOTE') {
            return (
              <blockquote key={idx} className="border-l-4 border-vjn-blue pl-4 italic my-6 text-lg text-gray-700 bg-gray-50 py-2">
                {el.textContent}
              </blockquote>
            );
          }
          if (el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'H4') {
            return (
              <div key={idx} className="font-bold text-2xl mt-8 mb-2 text-vjn-blue">{el.textContent}</div>
            );
          }
          if (el.tagName === 'UL' || el.tagName === 'OL') {
            return <div key={idx} className="my-4 ml-6 list-disc text-gray-800">{el.textContent}</div>;
          }
          // Drop cap for first paragraph
          if (idx === 0 && el.tagName === 'P' && el.textContent) {
            return (
              <p key={idx} className="text-lg leading-8 mb-4 first-letter:text-5xl first-letter:float-left first-letter:pr-2 first-letter:font-bold first-letter:text-vjn-blue">
                {el.textContent}
              </p>
            );
          }
          return (
            <p key={idx} className="text-lg leading-8 mb-4 text-gray-800">{el.textContent}</p>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vjn-blue"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{t('blog.notFound', 'Post not found')}</h2>
        <button
            onClick={() => navigate('/news')}
            className="text-vjn-blue hover:text-vjn-blue-dark"
        >
            {t('blog.backToNews', 'Back to News')}
        </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-vjn-blue text-white py-20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
          <button
              onClick={() => navigate('/news')}
              className="flex items-center text-white mb-8 hover:text-gray-200 transition-colors"
          >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t('blog.backToNews', 'Back to News')}
          </button>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.created_at).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {Math.ceil(post.content.split(' ').length / 200)} min read
              </span>
              <span>By {post.author}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image_url && (
        <div className="container mx-auto px-4 -mt-16 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-lg overflow-hidden shadow-xl"
          >
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-[400px] object-cover"
            />
          </motion.div>
        </div>
      )}

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-end gap-4 mb-8 print:hidden">
              <button onClick={handleShare} className="flex items-center gap-2 text-gray-600 hover:text-vjn-blue transition-colors">
                <Share2 className="w-5 h-5" /> {t('blog.share', 'Share')}
              </button>
              <button onClick={toggleBookmark} className={`flex items-center gap-2 transition-colors ${isBookmarked ? 'text-vjn-blue' : 'text-gray-600 hover:text-vjn-blue'}`}>
                <Bookmark className="w-5 h-5" /> {isBookmarked ? t('blog.bookmarked', 'Bookmarked') : t('blog.bookmark', 'Bookmark')}
              </button>
              <button onClick={handlePrint} className="flex items-center gap-2 text-gray-600 hover:text-vjn-blue transition-colors">
                <Printer className="w-5 h-5" /> {t('blog.print', 'Print')}
              </button>
          </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="prose prose-lg max-w-none text-gray-900">
              {renderFormattedContent(post.content)}
            </motion.div>
          </div>
          {/* Sidebar */}
          <aside className="lg:col-span-4 print:hidden">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="font-bold text-xl mb-4 text-vjn-blue">{t('blog.latest', 'Latest Posts')}</h3>
              <ul className="space-y-2">
                {latestPosts.map((p) => (
                  <li key={p.id}>
                    <button onClick={() => navigate(`/blog/${p.id}`)} className="text-vjn-blue hover:underline text-left w-full truncate">
                      {p.title}
                      </button>
                    </li>
                  ))}
                </ul>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="font-bold text-xl mb-4 text-vjn-blue">{t('blog.share', 'Share')}</h3>
              <div className="flex gap-3">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800"><Facebook className="w-6 h-6" /></a>
                <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600"><Twitter className="w-6 h-6" /></a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900"><Linkedin className="w-6 h-6" /></a>
                <button onClick={handleCopyLink} className="text-gray-600 hover:text-vjn-blue"><Copy className="w-6 h-6" /></button>
          </div>
            </div>
            {categories.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h3 className="font-bold text-xl mb-4 text-vjn-blue">{t('blog.categories', 'Categories')}</h3>
                <ul className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <li key={cat} className="bg-vjn-blue/10 text-vjn-blue px-3 py-1 rounded-full text-sm">{cat}</li>
                  ))}
                </ul>
          </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
};

export default BlogPost; 