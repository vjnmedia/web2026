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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slides, setSlides] = useState<SliderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSlides();
  }, [language]);

  const loadSlides = async () => {
    try {
      setIsLoading(true);
      const data = await sliderService.getSliderItems(language);
      setSlides(data);
      setImagesLoaded(new Array(data.length).fill(false));
    } catch (error) {
      console.error('Error loading slides:', error);
      toast.error(t('errors.slider.load'));
    } finally {
      setIsLoading(false);
    }
  };

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

  // Preload current and next images
  useEffect(() => {
    if (slides.length === 0) return;
    const nextIndex = (currentIndex + 1) % slides.length;
    preloadImage(currentIndex);
    preloadImage(nextIndex);
  }, [currentIndex, preloadImage, slides]);

  // Handle slide transitions
  const handleSlideChange = useCallback((newIndex: number, newDirection: number) => {
    if (isTransitioning || slides.length === 0) return;
    setIsTransitioning(true);
    setDirection(newDirection);
    setCurrentIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), 500); // Match transition duration
  }, [isTransitioning, slides]);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || isTransitioning || slides.length === 0) return;
    
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      handleSlideChange(nextIndex, 1);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isAutoPlaying, currentIndex, handleSlideChange, isTransitioning, slides]);

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setIsAutoPlaying(false);
    const nextIndex = (currentIndex + 1) % slides.length;
    handleSlideChange(nextIndex, 1);
  }, [currentIndex, handleSlideChange, slides]);

  const prevSlide = useCallback(() => {
    if (slides.length === 0) return;
    setIsAutoPlaying(false);
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    handleSlideChange(prevIndex, -1);
  }, [currentIndex, handleSlideChange, slides]);

  const goToSlide = useCallback((index: number) => {
    if (slides.length === 0) return;
    setIsAutoPlaying(false);
    const newDirection = index > currentIndex ? 1 : -1;
    handleSlideChange(index, newDirection);
  }, [currentIndex, handleSlideChange, slides]);

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
      <div className="h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vjn-blue"></div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">{t('slider.noSlides')}</h2>
          <p className="text-gray-600">{t('slider.noSlidesMessage')}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Slider */}
      <div className="relative h-full">
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
            <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
              <img
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title || ''}
                className="w-full h-full min-w-full min-h-full object-cover object-center select-none pointer-events-none"
                style={{ maxHeight: '80vh' }}
                draggable={false}
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
              
              <div className="absolute inset-0 bg-black/30 z-10" />
              <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 z-20 w-full flex justify-center">
                <div className="relative flex flex-col items-center justify-center max-w-3xl w-full mx-auto bg-black/40 rounded-lg px-4 py-6 backdrop-blur-md">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-6xl font-bold mb-4 text-white text-center"
                  >
                    {slides[currentIndex].title}
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg md:text-xl mb-8 text-white text-center"
                  >
                    {slides[currentIndex].description}
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
