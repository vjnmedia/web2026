import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { sliderService, type SliderItem } from '@/services/sliderService';
import { useLanguage } from '@/components/LanguageContext';
import { toast } from 'sonner';

const Hero = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  // Debug translation loading
  console.log('Hero component - language:', language);
  console.log('Hero component - slider.previous:', t('slider.previous'));
  console.log('Hero component - slider.next:', t('slider.next'));
  console.log('Hero component - slider.goToSlide:', t('slider.goToSlide'));
  console.log('Hero component - slider.learnMore:', t('slider.learnMore'));
  console.log('Hero component - slider.getInvolved:', t('slider.getInvolved'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slides, setSlides] = useState<SliderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageAspectRatio, setImageAspectRatio] = useState<'portrait' | 'landscape' | 'square'>('landscape');

  useEffect(() => {
    loadSlides();
  }, [language]);

  const loadSlides = async () => {
    try {
      setIsLoading(true);
      console.log('Loading slides for language:', language);
      const data = await sliderService.getSliderItems(language);
      console.log('Loaded slides:', data);
      
      // Fallback to mock data if no slides from database
      if (!data || data.length === 0) {
        console.log('No slides from database, using fallback data');
        const fallbackSlides = [
          {
            id: '1',
            title: 'Vision Jeunesse Nouvelle',
            description: 'Empowering Youth for a Better Future',
            image: '/images/home-slider/youth.JPG',
            order_index: 1,
            is_active: true,
            language: language,
            created_by: null,
            updated_by: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ];
        setSlides(fallbackSlides);
        setImagesLoaded(new Array(fallbackSlides.length).fill(false));
      } else {
        setSlides(data);
        setImagesLoaded(new Array(data.length).fill(false));
      }
    } catch (error) {
      console.error('Error loading slides:', error);
      // Use fallback data on error
      const fallbackSlides = [
        {
          id: '1',
          title: 'Vision Jeunesse Nouvelle',
          description: 'Empowering Youth for a Better Future',
          image: '/images/home-slider/youth.JPG',
          order_index: 1,
          is_active: true,
          language: language,
          created_by: null,
          updated_by: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      setSlides(fallbackSlides);
      setImagesLoaded(new Array(fallbackSlides.length).fill(false));
      toast.error('Using fallback slider data');
    } finally {
      setIsLoading(false);
    }
  };

  // Detect image aspect ratio
  const detectAspectRatio = useCallback((imageSrc: string) => {
    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      if (aspectRatio > 1.2) {
        setImageAspectRatio('landscape');
      } else if (aspectRatio < 0.8) {
        setImageAspectRatio('portrait');
      } else {
        setImageAspectRatio('square');
      }
    };
    img.src = imageSrc;
  }, []);

  // Preload images with priority
  const preloadImage = useCallback((index: number) => {
    if (!slides[index]) return;
    const img = new Image();
    img.src = slides[index].image;
    img.onload = () => {
      setImagesLoaded(prev => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });
    };
  }, [slides]);

  // Preload next and previous images
  useEffect(() => {
    if (slides.length > 0) {
      preloadImage((currentIndex + 1) % slides.length);
      preloadImage((currentIndex - 1 + slides.length) % slides.length);
    }
  }, [currentIndex, slides.length, preloadImage]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, slides.length]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, slides.length]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, currentIndex]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  if (isLoading) {
    return (
      <div className="h-[80vh] flex items-center justify-center" style={{ marginTop: '5rem' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vjn-blue"></div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="h-[80vh] flex items-center justify-center" style={{ marginTop: '5rem' }}>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">No slides available</h2>
          <p className="text-gray-600">Please check your database connection or add some slides.</p>
          <div className="mt-4">
            <img 
              src="/images/home-slider/youth.JPG" 
              alt="Fallback image" 
              className="w-full max-w-md mx-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative bg-gray-100" style={{ marginTop: '5rem' }}>
      {/* Image Slider - Full Height */}
      <div className="hero-slider">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full h-full"
          >
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title || ''}
              className="w-full h-full object-cover object-center select-none pointer-events-none"
              draggable={false}
              onLoad={() => {
                console.log('Image loaded:', slides[currentIndex].image);
                detectAspectRatio(slides[currentIndex].image);
              }}
              onError={(e) => console.error('Image failed to load:', slides[currentIndex].image, e)}
            />
            {/* Preload next image */}
            <picture>
              <source
                srcSet={slides[(currentIndex + 1) % slides.length].image_webp || slides[(currentIndex + 1) % slides.length].image}
                type="image/webp"
              />
              <img
                src={slides[(currentIndex + 1) % slides.length].image}
                alt=""
                className="hidden"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          disabled={isTransitioning}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors disabled:opacity-50"
          aria-label={t('slider.previous')}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNext}
          disabled={isTransitioning}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors disabled:opacity-50"
          aria-label={t('slider.next')}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`${t('slider.goToSlide')} ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Caption Section Below Image */}
      <div className="hero-caption">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1
            key={`title-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-vjn-blue"
          >
            {slides[currentIndex].title}
          </motion.h1>
          <motion.p
            key={`description-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl mb-8 text-gray-700 leading-relaxed"
          >
            {slides[currentIndex].description}
          </motion.p>
          <motion.div
            key={`buttons-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-vjn-blue hover:bg-vjn-blue/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg">
              {t('slider.learnMore')}
            </button>
            <button className="border-2 border-vjn-blue text-vjn-blue hover:bg-vjn-blue hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg">
              {t('slider.getInvolved')}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;