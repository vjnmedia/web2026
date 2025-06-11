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

  // Infinite scroll effect
  useEffect(() => {
    if (inView && hasMore && !isLoadingMore && !loading && twitterPosts.length > 0) {
      loadMorePosts();
    }
  }, [inView, hasMore, isLoadingMore, loading, twitterPosts.length]);

  const loadMorePosts = async () => {
    if (!hasMore || isLoadingMore) return;
    setIsLoadingMore(true);
    await fetchPosts(page + 1); // Assuming fetchPosts can take a page number
    setPage(prevPage => prevPage + 1);
    setIsLoadingMore(false);
    // You'll need to implement logic in fetchPosts to determine if there are more posts
    // and update hasMore accordingly. For now, we'll assume it always has more until proven otherwise.
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleShare = async (postId: string, platform?: string) => {
    const postUrl = `${window.location.origin}/news/${postId}`; // Assuming a unique URL for each post
    try {
      if (navigator.share && platform === 'web') {
        await navigator.share({
          title: 'VJN News & Updates',
          text: 'Check out this post from VJN!',
          url: postUrl,
        });
      } else if (platform === 'copy') {
        await navigator.clipboard.writeText(postUrl);
        toast.success('Link copied to clipboard!');
      } else {
        // Fallback for other platforms or if web share is not available
        let shareUrl = '';
        switch (platform) {
          case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
            break;
          case 'linkedin':
            shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}`;
            break;
          case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this post: ${postUrl}`)}`;
            break;
          case 'mail':
            shareUrl = `mailto:?subject=VJN News & Updates&body=Check out this post from VJN: ${postUrl}`;
            break;
          default:
            // If no specific platform, try general share or copy
            if (navigator.clipboard) {
              await navigator.clipboard.writeText(postUrl);
              toast.success('Link copied to clipboard!');
              return;
            } else {
              toast.error('Sharing not supported on this device/browser.');
              return;
            }
        }
        window.open(shareUrl, '_blank');
      }
      setShowShareMenu(null); // Close share menu after action
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share post.');
    }
  };

  const handleReport = (postId: string) => {
    toast.info(`Post ${postId} reported. Thank you for your feedback.`);
    setShowPostMenu(null);
  };

  const handleMute = () => {
    setIsMuted(prev => !prev);
    toast.success(isMuted ? 'Sound unmuted' : 'Sound muted');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMediaZoom = (e: React.MouseEvent) => {
    const { deltaY } = e;
    setMediaScale(prev => Math.max(0.5, Math.min(3, prev - deltaY * 0.001)));
  };

  const handleMediaPan = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setMediaPosition(prev => ({
      x: prev.x + e.movementX,
      y: prev.y + e.movementY
    }));
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.error('Invalid date string:', dateString);
        return 'Invalid Date';
      }
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
        toast.info('Post unliked');
      } else {
        newSet.add(postId);
        toast.success('Post liked!');
      }
      return newSet;
    });
  };

  const handleBookmark = (postId: string) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
        toast.info('Post unbookmarked');
      } else {
        newSet.add(postId);
        toast.success('Post bookmarked!');
      }
      return newSet;
    });
  };

  const extractLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-vjn-blue hover:underline">${url}</a>`);
  };

  const extractMedia = (text: string) => {
    const mediaRegex = /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|vimeo\.com\/)\S+|https?:\/\/\S+\.(?:jpg|jpeg|png|gif|webp|mp4|webm|ogg))/gi;
    return text.replace(mediaRegex, (url) => {
      if (url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        return `<img src="${url}" alt="media" class="rounded-lg max-h-96 w-full object-cover my-2 cursor-zoom-in" />`;
      } else if (url.match(/\.(mp4|webm|ogg)$/i)) {
        return `<video controls src="${url}" class="rounded-lg max-h-96 w-full object-cover my-2" />`;
      } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = url.split('v=')[1] || url.split('/').pop();
        return `<div class="aspect-video w-full my-2"><iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full h-full"></iframe></div>`;
      } else if (url.includes('vimeo.com')) {
        const videoId = url.split('/').pop();
        return `<div class="aspect-video w-full my-2"><iframe src="https://player.vimeo.com/video/${videoId}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen class="w-full h-full"></iframe></div>`;
      }
      return url; // Return original if not a recognized media format
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - touchStart.x;
    const dy = e.touches[0].clientY - touchStart.y;
    setMediaPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleMediaPreview = (mediaUrl: string, index: number) => {
    setSelectedMediaIndex(index);
    setShowMediaPreview(mediaUrl);
    setMediaScale(1);
    setMediaPosition({ x: 0, y: 0 });
  };

  const handleKeyDownMediaNav = (e: React.KeyboardEvent) => {
    if (showMediaPreview && selectedPost && selectedPost.media) {
      if (e.key === 'ArrowRight') {
        setSelectedMediaIndex(prev => Math.min(selectedPost.media.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setSelectedMediaIndex(prev => Math.max(0, prev - 1));
      }
    }
  };

  // Helper to format Twitter-like content
  const formatContent = (content: string) => {
    // Convert newlines to <br/> for display
    let formattedText = content.replace(/\n/g, '<br/>');
    // Basic link detection
    formattedText = formattedText.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-vjn-blue hover:underline">$1</a>');
    // Basic hashtag detection
    formattedText = formattedText.replace(/#(\w+)/g, '<span class="text-vjn-blue">#$1</span>');
    // Basic mention detection
    formattedText = formattedText.replace(/@(\w+)/g, '<span class="text-vjn-blue">@$1</span>');
    return formattedText;
  };

  const renderMedia = (media: { type: string; url: string }[], isPreview = false) => {
    if (!media || media.length === 0) return null;

    if (isPreview) {
      const currentMedia = media[selectedMediaIndex];
      if (currentMedia.type === 'image') {
        return (
          <motion.img
            src={currentMedia.url}
            alt="Media Preview"
            className="max-h-[80vh] max-w-[80vw] object-contain cursor-grab"
            style={{ x, y, scale: springScale }}
            onMouseDown={(e) => { setIsDragging(true); setMediaPosition({ x: 0, y: 0 }); }}
            onMouseUp={() => setIsDragging(false)}
            onMouseMove={handleMediaPan}
            onWheel={handleMediaZoom}
            ref={mediaRef}
          />
        );
      } else if (currentMedia.type === 'video') {
        return (
          <video controls src={currentMedia.url} className="max-h-[80vh] max-w-[80vw] object-contain" autoPlay />
        );
      }
      return null;
    }

    return (
      <div className={`grid ${media.length === 1 ? 'grid-cols-1' : media.length === 2 ? 'grid-cols-2' : 'grid-cols-2 grid-rows-2'} gap-2 mt-4`}>
        {media.slice(0, 4).map((m, idx) => (
          <div key={idx} className={`relative group w-full h-48 rounded-lg overflow-hidden cursor-pointer ${media.length > 2 && idx === 0 ? 'col-span-2' : ''} ${media.length === 3 && idx === 2 ? 'col-span-2' : ''}`} onClick={() => handleMediaPreview(m.url, idx)}>
            {m.type === 'image' ? (
              <img src={m.url} alt="Post media" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            ) : (
              <video src={m.url} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {m.type === 'video' && <Play className="text-white h-8 w-8" />}
              {media.length > 4 && idx === 3 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold">
                  +{media.length - 4}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getCategoryStyle = (category: string | undefined) => {
    return category && (CATEGORY_STYLES as any)[category.toLowerCase()] || {};
  };

  // Debounced search input
  const debounce = (func: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return function (...args: any[]) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const debouncedSetSearchQuery = useCallback(
    debounce((value: string) => setSearchQuery(value), 300),
    []
  );

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleCompactView = () => setIsCompactView(prev => !prev);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg ${isDarkMode ? 'bg-vjn-blue text-white' : 'bg-vjn-blue text-white'} hover:bg-vjn-blue-dark transition-colors z-50`}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Media Preview Modal */}
      <AnimatePresence>
        {showMediaPreview && selectedPost && selectedPost.media && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-[100] flex items-center justify-center p-4"
            onClick={() => setShowMediaPreview(null)}
            onKeyDown={handleKeyDownMediaNav} // Add keyboard navigation for media
            tabIndex={0} // Make div focusable for key events
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMediaPreview(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-[101]"
              aria-label="Close media preview"
            >
              <XIcon className="h-8 w-8" />
            </motion.button>

            <div className="relative" onClick={e => e.stopPropagation()}>
              {renderMedia(selectedPost.media, true)}

              {selectedPost.media.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedMediaIndex(prev => Math.max(0, prev - 1)); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white z-[101]"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedMediaIndex(prev => Math.min(selectedPost.media.length - 1, prev + 1)); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white z-[101]"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-[101]">
                <button
                  onClick={(e) => { e.stopPropagation(); setMediaScale(prev => Math.min(3, prev + 0.2)); }}
                  className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white"
                >
                  <ZoomIn className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setMediaScale(prev => Math.max(0.5, prev - 0.2)); }}
                  className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white"
                >
                  <ZoomOut className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setMediaScale(1); setMediaPosition({ x: 0, y: 0 }); }}
                  className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white"
                >
                  <Minimize2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Menu */}
      <AnimatePresence>
        {showShareMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`absolute z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 space-y-2 border border-gray-200 dark:border-gray-700`}
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
          >
            <button
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md w-full text-left"
              onClick={() => handleShare(showShareMenu, 'copy')}
            >
              <Copy className="h-4 w-4" /> <span>{t('newsUpdates.copyLink', 'Copy Link')}</span>
            </button>
            <button
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md w-full text-left"
              onClick={() => handleShare(showShareMenu, 'facebook')}
            >
              <Facebook className="h-4 w-4 text-blue-600" /> <span>{t('newsUpdates.shareFacebook', 'Share on Facebook')}</span>
            </button>
            <button
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md w-full text-left"
              onClick={() => handleShare(showShareMenu, 'linkedin')}
            >
              <Linkedin className="h-4 w-4 text-blue-700" /> <span>{t('newsUpdates.shareLinkedIn', 'Share on LinkedIn')}</span>
            </button>
            <button
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md w-full text-left"
              onClick={() => handleShare(showShareMenu, 'whatsapp')}
            >
              <MessageSquare className="h-4 w-4 text-green-500" /> <span>{t('newsUpdates.shareWhatsApp', 'Share on WhatsApp')}</span>
            </button>
            <button
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md w-full text-left"
              onClick={() => handleShare(showShareMenu, 'mail')}
            >
              <Mail className="h-4 w-4 text-red-500" /> <span>{t('newsUpdates.shareEmail', 'Share via Email')}</span>
            </button>
            <button
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md w-full text-left"
              onClick={() => handleShare(showShareMenu, 'web')}
            >
              <Share className="h-4 w-4" /> <span>{t('newsUpdates.shareWeb', 'Web Share (Native)')}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post Action Menu */}
      <AnimatePresence>
        {showPostMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`absolute z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 space-y-2 border border-gray-200 dark:border-gray-700`}
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md w-full text-left"
              onClick={() => handleReport(showPostMenu)}
            >
              <Flag className="h-4 w-4 text-red-500" /> <span>{t('newsUpdates.reportPost', 'Report Post')}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t('newsUpdates.title', 'News & Updates')}</h1>
          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}>
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button onClick={toggleCompactView} className={`p-2 rounded-full ${isCompactView ? 'bg-vjn-blue text-white' : 'bg-gray-200 text-gray-700'}`}>
              {isCompactView ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </button>
            <button onClick={handleMute} className={`p-2 rounded-full ${isMuted ? 'bg-red-200 text-red-700' : 'bg-gray-200 text-gray-700'}`}>
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('newsUpdates.searchPlaceholder', 'Search posts...')}
              className={`w-full py-2 pl-10 pr-4 rounded-full border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-vjn-blue`}
              onChange={(e) => debouncedSetSearchQuery(e.target.value)}
              ref={searchInputRef}
            />
            {searchQuery && (
              <X className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" onClick={() => { setSearchQuery(''); if (searchInputRef.current) searchInputRef.current.value = ''; }} />
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(prev => !prev)}
              className={`w-full md:w-auto py-2 px-6 rounded-full border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'} flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-vjn-blue`}
            >
              {t('newsUpdates.filterBy', 'Filter by')}: {CATEGORIES.find(cat => cat.id === selectedCategory)?.label}
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 z-10 border border-gray-200 dark:border-gray-700`}
                  ref={filterRef}
                >
                  {CATEGORIES.map(category => (
                    <button
                      key={category.id}
                      onClick={() => { handleCategoryChange(category.id); setIsFilterOpen(false); }}
                      className={`block w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} ${selectedCategory === category.id ? 'bg-vjn-blue text-white hover:bg-vjn-blue-dark' : ''}`}
                    >
                      {category.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {loading && twitterPosts.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-vjn-blue" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center text-gray-500 py-10">{t('newsUpdates.noPostsFound', 'No posts found matching your criteria.')}</div>
        ) : (
          <div className={`grid gap-6 ${isCompactView ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-1'}`}>
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${isCompactView ? 'flex flex-col' : ''}`}
              >
                {post.media && post.media.length > 0 && (
                  <div className="relative w-full h-56 md:h-64 overflow-hidden">
                    {post.media[0].type === 'image' ? (
                      <img
                        src={post.media[0].url}
                        alt="Post Media"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={post.media[0].url}
                        className="w-full h-full object-cover"
                        controls={false}
                        autoPlay={false}
                        muted={isMuted}
                      />
                    )}
                    {post.media.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center">
                        <ImageIcon className="h-3 w-3 mr-1" /> {post.media.length}
                      </div>
                    )}
                  </div>
                )}
                <div className="p-6 flex-grow">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-2">
                      {post.category && (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold`}
                          style={{
                            backgroundColor: getCategoryStyle(post.category).bgColor,
                            color: getCategoryStyle(post.category).color,
                          }}
                        >
                          {getCategoryStyle(post.category).icon} {t(`newsUpdates.categories.${post.category}`, post.category)}
                        </span>
                      )}
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" /> {formatDate(post.date)}
                      </span>
                    </div>
                    <div className="relative">
                      <button onClick={(e) => { e.stopPropagation(); setShowPostMenu(showPostMenu === post.id ? null : post.id); }} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                      {showPostMenu === post.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 z-10 border border-gray-200 dark:border-gray-700`}
                        >
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => handleReport(post.id)}
                          >
                            {t('newsUpdates.report', 'Report')}
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <h2 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{post.title}</h2>
                  <div
                    className={`text-gray-700 dark:text-gray-300 leading-relaxed ${isCompactView ? 'line-clamp-3' : 'line-clamp-5'}`}
                    dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                  />
                  {post.link && (
                    <a href={post.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-vjn-blue hover:text-vjn-blue-dark transition-colors">
                      {t('newsUpdates.viewOriginal', 'View Original Post')}
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  )}
                  {post.media && post.media.length > 0 && (
                    <div className="mt-4">
                      <button onClick={() => handleMediaPreview(post.media[0].url, 0)} className="inline-flex items-center text-vjn-blue hover:text-vjn-blue-dark transition-colors text-sm">
                        <ImageIcon className="h-4 w-4 mr-1" /> {t('newsUpdates.viewMedia', 'View Media')} ({post.media.length})
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-gray-500 text-sm">
                  <div className="flex space-x-4">
                    <button onClick={() => handleLike(post.id)} className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                      <Heart className={`h-5 w-5 ${likedPosts.has(post.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                    <button onClick={() => toast.info('Comments feature coming soon!')} className="flex items-center space-x-1 hover:text-vjn-blue transition-colors">
                      <MessageCircle className="h-5 w-5" />
                      <span>{post.comments}</span>
                    </button>
                    <button onClick={() => setShowShareMenu(post.id)} className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                      <Share2 className="h-5 w-5" />
                      <span>{post.shares}</span>
                    </button>
                  </div>
                  <button onClick={() => handleBookmark(post.id)} className="hover:text-yellow-500 transition-colors">
                    <Bookmark className={`h-5 w-5 ${bookmarkedPosts.has(post.id) ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {isLoadingMore && (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-vjn-blue" />
          </div>
        )}

        {!hasMore && twitterPosts.length > 0 && (
          <div className="text-center text-gray-500 py-8">You've reached the end of the posts.</div>
        )}

        {/* Shortcuts Modal */}
        <AnimatePresence>
          {showShortcuts && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100] p-4"
              onClick={() => setShowShortcuts(false)}
            >
              <div
                className={`relative ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'} rounded-lg shadow-xl p-8 max-w-xl w-full`}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowShortcuts(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <XIcon className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-bold mb-6">{t('newsUpdates.shortcuts.title', 'Keyboard Shortcuts')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(SHORTCUTS).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                      <span className="font-medium">{t(`newsUpdates.shortcuts.${key.toLowerCase()}`, key.replace(/_/g, ' ').toLowerCase())}</span>
                      <span className="font-mono text-sm px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-sm">{value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-6">
                  {t('newsUpdates.shortcuts.note', 'Press Ctrl + ? to toggle this help.')}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Simple debounce function
const debounce = (func: Function, delay: number) => {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};

export default NewsUpdates; 