import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X as XIcon, Calendar, Heart, Repeat2, MessageCircle, ExternalLink, Share2, Bookmark, MoreHorizontal, Image as ImageIcon, Link as LinkIcon, Search, X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, ArrowUp, Share, Copy, Facebook, Linkedin, MessageSquare, Mail, Flag, Volume2, VolumeX, Sun, Moon, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useSocialMedia } from '@/hooks/useSocialMedia';
import { SocialMediaPost } from '@/types/socialMedia';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-hot-toast';

// Categories for filtering posts
const CATEGORIES = [
  { id: 'all', label: 'All Posts' },
  { id: 'news', label: 'News' },
  { id: 'events', label: 'Events' },
  { id: 'programs', label: 'Programs' },
  { id: 'updates', label: 'Updates' }
];

// Enhanced keyboard shortcuts
const SHORTCUTS = {
  SEARCH: 'ctrl+k',
  NEXT_POST: 'j',
  PREV_POST: 'k',
  LIKE: 'l',
  BOOKMARK: 'b',
  SHARE: 's',
  ZOOM_IN: '=',
  ZOOM_OUT: '-',
  CLOSE: 'Escape',
  TOP: 'Home',
  BOTTOM: 'End',
  MUTE: 'm',
  REPORT: 'r',
  COPY_LINK: 'c',
  TOGGLE_CATEGORY: 't',
  FOCUS_FILTER: 'f'
};

const CATEGORY_STYLES = {
  education: {
    color: '#4F46E5',
    bgColor: '#EEF2FF',
    icon: '📚'
  },
  health: {
    color: '#059669',
    bgColor: '#ECFDF5',
    icon: '🏥'
  },
  culture: {
    color: '#7C3AED',
    bgColor: '#F5F3FF',
    icon: '🎨'
  },
  sports: {
    color: '#EA580C',
    bgColor: '#FFF7ED',
    icon: '⚽'
  },
  economic: {
    color: '#2563EB',
    bgColor: '#EFF6FF',
    icon: '💼'
  },
  peace: {
    color: '#DB2777',
    bgColor: '#FDF2F8',
    icon: '🕊️'
  }
};

const NewsUpdates: React.FC = () => {
  const { t } = useTranslation();
  const { twitterPosts, loading, error, fetchPosts } = useSocialMedia();
  const [selectedPost, setSelectedPost] = useState<SocialMediaPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set());
  const [showMediaPreview, setShowMediaPreview] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [mediaScale, setMediaScale] = useState(1);
  const [mediaPosition, setMediaPosition] = useState({ x: 0, y: 0 });
  const [showShareMenu, setShowShareMenu] = useState<string | null>(null);
  const [showPostMenu, setShowPostMenu] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCompactView, setIsCompactView] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const mediaRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Define filteredPosts before effects
  const filteredPosts = React.useMemo(() => {
    return twitterPosts.filter(post => {
      const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [twitterPosts, searchQuery, selectedCategory]);

  // Intersection Observer for infinite scroll
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    triggerOnce: false
  });

  // Media preview motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const springScale = useSpring(scale, { stiffness: 300, damping: 30 });

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Search shortcut
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }

      // Navigation shortcuts
      if (selectedPostIndex !== null) {
        if (e.key === SHORTCUTS.NEXT_POST) {
          e.preventDefault();
          setSelectedPostIndex(prev => Math.min(filteredPosts.length - 1, (prev || 0) + 1));
        } else if (e.key === SHORTCUTS.PREV_POST) {
          e.preventDefault();
          setSelectedPostIndex(prev => Math.max(0, (prev || 0) - 1));
        }
      }

      // Media preview shortcuts
      if (showMediaPreview) {
        if (e.key === SHORTCUTS.ZOOM_IN) {
          e.preventDefault();
          setMediaScale(prev => Math.min(3, prev + 0.5));
        } else if (e.key === SHORTCUTS.ZOOM_OUT) {
          e.preventDefault();
          setMediaScale(prev => Math.max(1, prev - 0.5));
        } else if (e.key === SHORTCUTS.CLOSE) {
          e.preventDefault();
          setShowMediaPreview(null);
        }
      }

      // General shortcuts
      if (e.key === SHORTCUTS.TOP) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (e.key === SHORTCUTS.BOTTOM) {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }

      // New shortcuts
      if (e.key === SHORTCUTS.MUTE) {
        e.preventDefault();
        handleMute();
      } else if (e.key === SHORTCUTS.REPORT && selectedPostIndex !== null) {
        e.preventDefault();
        handleReport(filteredPosts[selectedPostIndex].id);
      } else if (e.key === SHORTCUTS.COPY_LINK && selectedPostIndex !== null) {
        e.preventDefault();
        handleShare(filteredPosts[selectedPostIndex].id, 'copy');
      } else if (e.key === SHORTCUTS.TOGGLE_CATEGORY) {
        e.preventDefault();
        setIsFilterOpen(prev => !prev);
      } else if (e.key === SHORTCUTS.FOCUS_FILTER) {
        e.preventDefault();
        filterRef.current?.focus();
      } else if (e.key === '?' && e.ctrlKey) {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedPostIndex, showMediaPreview, filteredPosts, selectedCategory]);

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadMorePosts = async () => {
    setIsLoadingMore(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPage(prev => prev + 1);
      setHasMore(page < 3);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleShare = async (postId: string, platform?: string) => {
    const url = `https://x.com/visionjeunesse2/status/${postId}`;
    const text = 'Check out this post from Vision Jeunesse Nouvelle';

    try {
      switch (platform) {
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
          break;
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
          break;
        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`);
          break;
        case 'email':
          window.open(`mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`);
          break;
        case 'copy':
          await navigator.clipboard.writeText(url);
          toast.success('Link copied to clipboard!');
          break;
        default:
          if (navigator.share) {
            await navigator.share({
              title: text,
              url: url
            });
          } else {
            await navigator.clipboard.writeText(url);
            toast.success('Link copied to clipboard!');
          }
      }
    } catch (err) {
      toast.error('Failed to share post');
    }
    setShowShareMenu(null);
  };

  const handleReport = (postId: string) => {
    // Implement report functionality
    toast.success('Post reported successfully');
    setShowPostMenu(null);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    toast.success(`Posts ${isMuted ? 'unmuted' : 'muted'}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMediaZoom = (e: React.MouseEvent) => {
    if (!mediaRef.current) return;
    
    const rect = mediaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newScale = mediaScale === 1 ? 2 : 1;
    setMediaScale(newScale);
    scale.set(newScale);
    
    if (newScale > 1) {
      setMediaPosition({
        x: (rect.width / 2 - x) * (newScale - 1),
        y: (rect.height / 2 - y) * (newScale - 1)
      });
    } else {
      setMediaPosition({ x: 0, y: 0 });
    }
  };

  const handleMediaPan = (e: React.MouseEvent) => {
    if (mediaScale <= 1) return;
    
    const deltaX = e.movementX;
    const deltaY = e.movementY;
    
    setMediaPosition(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleBookmark = (postId: string) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const extractLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
  };

  const extractMedia = (text: string) => {
    // This is a simplified version. In a real app, you'd want to handle various media types
    const imageRegex = /(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif))/gi;
    return text.match(imageRegex) || [];
  };

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.x || !touchStart.y) return;

    const deltaX = e.touches[0].clientX - touchStart.x;
    const deltaY = e.touches[0].clientY - touchStart.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 50) {
        // Swipe right - previous image
        setSelectedMediaIndex(prev => Math.max(0, prev - 1));
      } else if (deltaX < -50) {
        // Swipe left - next image
        setSelectedMediaIndex(prev => Math.min(media.length - 1, prev + 1));
      }
    }
  };

  // Enhanced media preview with gestures
  const handleMediaPreview = (mediaUrl: string, index: number) => {
    setShowMediaPreview(mediaUrl);
    setSelectedMediaIndex(index);
    setMediaScale(1);
    setMediaPosition({ x: 0, y: 0 });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1DA1F2]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          <p className="text-xl font-semibold mb-2">{t('news.error.title', 'Error Loading Updates')}</p>
          <p>{error}</p>
          <button
            onClick={fetchPosts}
            className="mt-4 px-4 py-2 bg-[#1DA1F2] text-white rounded-full hover:bg-[#1a8cd8] transition-colors"
          >
            {t('news.error.retry', 'Retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 py-8 max-w-4xl ${isDarkMode ? 'dark' : ''}`} ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">{t('news.title', 'News Updates')}</h1>
        <p className="text-xl text-gray-600">
          {t('news.description', 'Stay updated with our latest news, events, and announcements.')}
        </p>
      </motion.div>

      {/* Enhanced Search and Filter Section */}
      <div className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10 py-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search posts... (Ctrl+K)"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 focus:border-[#1DA1F2] focus:ring-1 focus:ring-[#1DA1F2] outline-none dark:bg-gray-800 dark:text-white"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              >
                <XIcon className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleMute}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              title={`${isMuted ? 'Unmute' : 'Mute'} posts (M)`}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsDarkMode(prev => !prev)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              title="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsCompactView(prev => !prev)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              title="Toggle compact view"
            >
              {isCompactView ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
            </button>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-[#1DA1F2] text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Posts Feed */}
      <div className={`space-y-4 ${isCompactView ? 'max-w-2xl mx-auto' : ''}`}>
        {filteredPosts.map((post, index) => {
          const links = extractLinks(post.content);
          const media = extractMedia(post.content);
          const isLiked = likedPosts.has(post.id);
          const isBookmarked = bookmarkedPosts.has(post.id);
          const isSelected = selectedPostIndex === index;
          const categoryStyle = CATEGORY_STYLES[post.category];

          return (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border ${
                isSelected ? 'border-[#1DA1F2] ring-2 ring-[#1DA1F2]' : 'border-gray-200 dark:border-gray-700'
              }`}
              onClick={() => setSelectedPostIndex(index)}
            >
              <div className="p-6">
                {/* Category Badge */}
                <div className="mb-4">
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: categoryStyle.bgColor,
                      color: categoryStyle.color
                    }}
                  >
                    {categoryStyle.icon} {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </span>
                </div>

                <div className="flex items-start space-x-4">
                  <img
                    src={post.authorImage}
                    alt={post.author}
                    className="w-12 h-12 rounded-full ring-2 ring-[#1DA1F2]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{post.author}</h3>
                        <p className="text-gray-500 text-sm">{post.authorHandle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {formatDate(post.timestamp)}
                        </span>
                        <button
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowPostMenu(showPostMenu === post.id ? null : post.id);
                          }}
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-900 dark:text-white mt-3 whitespace-pre-wrap break-words">
                      {post.content}
                    </p>

                    {media.length > 0 && (
                      <div className="mt-4 rounded-xl overflow-hidden">
                        <img
                          src={media[0]}
                          alt="Post media"
                          className="w-full h-auto object-cover cursor-zoom-in hover:opacity-90 transition-opacity"
                          onClick={() => handleMediaPreview(media[0], 0)}
                        />
                      </div>
                    )}

                    {links.length > 0 && (
                      <div className="mt-3 flex items-center text-[#1DA1F2]">
                        <LinkIcon className="w-4 h-4 mr-1" />
                        <a
                          href={links[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm truncate hover:underline"
                        >
                          {links[0]}
                        </a>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center space-x-6">
                        <button
                          className="flex items-center space-x-2 text-gray-500 hover:text-[#1DA1F2] transition-colors"
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart className={`w-5 h-5 ${isLiked ? 'fill-[#1DA1F2] text-[#1DA1F2]' : ''}`} />
                          <span>{post.likes + (isLiked ? 1 : 0)}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-[#1DA1F2] transition-colors">
                          <Repeat2 className="w-5 h-5" />
                          <span>{post.retweets}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-[#1DA1F2] transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments || 0}</span>
                        </button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          className="text-gray-500 hover:text-[#1DA1F2] transition-colors"
                          onClick={() => handleBookmark(post.id)}
                        >
                          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-[#1DA1F2] text-[#1DA1F2]' : ''}`} />
                        </button>
                        <button
                          className="text-gray-500 hover:text-[#1DA1F2] transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowShareMenu(showShareMenu === post.id ? null : post.id);
                          }}
                        >
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Infinite Scroll Trigger */}
      <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
        {isLoadingMore && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1DA1F2]"></div>
        )}
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-[#1DA1F2] text-white p-3 rounded-full shadow-lg hover:bg-[#1a8cd8] transition-colors"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Enhanced Media Preview Modal */}
      <AnimatePresence>
        {showMediaPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowMediaPreview(null);
              setMediaScale(1);
              setMediaPosition({ x: 0, y: 0 });
            }}
          >
            <motion.div
              className="relative max-w-7xl w-full h-full flex items-center justify-center"
              onClick={e => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            >
              <motion.img
                ref={mediaRef}
                src={showMediaPreview}
                alt="Media preview"
                className="max-w-full max-h-[90vh] object-contain cursor-zoom-in"
                style={{
                  scale: springScale,
                  x: mediaPosition.x,
                  y: mediaPosition.y
                }}
                onClick={handleMediaZoom}
                onMouseMove={handleMediaPan}
                drag={mediaScale > 1}
                dragConstraints={containerRef}
                dragElastic={0.1}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              />
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/50 rounded-full px-4 py-2">
                <button
                  onClick={() => setMediaScale(prev => Math.max(1, prev - 0.5))}
                  className="text-white hover:text-gray-300"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <span className="text-white">{Math.round(mediaScale * 100)}%</span>
                <button
                  onClick={() => setMediaScale(prev => Math.min(3, prev + 0.5))}
                  className="text-white hover:text-gray-300"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute top-4 right-4 text-white text-sm flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white/20 rounded">Esc</kbd> to close
                <kbd className="px-2 py-1 bg-white/20 rounded">+/-</kbd> to zoom
                <kbd className="px-2 py-1 bg-white/20 rounded">←/→</kbd> to navigate
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Shortcuts Help Modal */}
      <AnimatePresence>
        {showShortcuts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowShortcuts(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Keyboard Shortcuts</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(SHORTCUTS).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{key}</span>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{value}</kbd>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowShortcuts(false)}
                className="mt-6 px-4 py-2 bg-[#1DA1F2] text-white rounded-full hover:bg-[#1a8cd8] transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Follow Button */}
      <div className="text-center mt-12">
        <a
          href="https://x.com/visionjeunesse2"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          <XIcon className="w-5 h-5 mr-2" />
          {t('news.followX', 'Follow us on X')}
        </a>
      </div>
    </div>
  );
};

export default NewsUpdates; 