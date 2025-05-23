import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, PanInfo, useAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Briefcase, Heart, Handshake, Music, Trophy, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Minimize2, Info } from 'lucide-react';

const Programs = () => {
  const { t } = useTranslation();
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const controlsTimeout = useRef<NodeJS.Timeout>();
  const imageRef = useRef<HTMLImageElement>(null);
  const controls = useAnimation();

  // Zoom and pan animation values
  const scale = useMotionValue(1);
  const springScale = useSpring(scale, { stiffness: 300, damping: 30 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(1);

  // Check if device is mobile and supports haptics
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Handle haptic feedback
  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  // Handle fullscreen
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
      triggerHaptic();
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  // Handle double tap zoom with haptic feedback
  const [lastTap, setLastTap] = useState(0);
  const handleDoubleTap = (e: React.TouchEvent) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) {
      handleZoom();
      triggerHaptic();
    }
    setLastTap(currentTime);
  };

  // Enhanced pinch zoom with momentum
  const [initialPinchDistance, setInitialPinchDistance] = useState<number | null>(null);
  const [initialScale, setInitialScale] = useState(1);
  const [pinchVelocity, setPinchVelocity] = useState(0);
  const lastPinchTime = useRef(0);

  const getDistance = (touches: TouchList) => {
    return Math.hypot(
      touches[1].clientX - touches[0].clientX,
      touches[1].clientY - touches[0].clientY
    );
  };

  const handlePinchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setInitialPinchDistance(getDistance(e.touches));
      setInitialScale(scale.get());
      lastPinchTime.current = Date.now();
      triggerHaptic();
    }
  };

  const handlePinchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDistance) {
      const currentDistance = getDistance(e.touches);
      const currentTime = Date.now();
      const timeDiff = currentTime - lastPinchTime.current;
      
      if (timeDiff > 0) {
        const velocity = (currentDistance - initialPinchDistance) / timeDiff;
        setPinchVelocity(velocity);
      }
      
      const newScale = (currentDistance / initialPinchDistance) * initialScale;
      scale.set(Math.min(Math.max(newScale, 1), 3));
      lastPinchTime.current = currentTime;
    }
  };

  const handlePinchEnd = () => {
    if (pinchVelocity !== 0) {
      const momentum = pinchVelocity * 100;
      scale.set(Math.min(Math.max(scale.get() + momentum, 1), 3));
    }
    setInitialPinchDistance(null);
    setPinchVelocity(0);
  };

  // Enhanced drag to dismiss with velocity
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const velocity = Math.abs(info.velocity.y);
    if (Math.abs(info.offset.y) > 100 || velocity > 500) {
      handleCloseGallery();
      triggerHaptic();
    } else {
      x.set(0);
      y.set(0);
    }
  };

  // Handle image loading
  const handleImageLoad = () => {
    setIsLoading(false);
    controls.start({ opacity: 1 });
  };

  const handleImageClick = (programId: string) => {
    setIsLoading(true);
    setSelectedProgram(programId);
    setCurrentImageIndex(0);
    setIsZoomed(false);
    scale.set(1);
    controls.start({ opacity: 0 });
  };

  // Auto-hide controls
  const handleTouchStart = () => {
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    setShowControls(true);
  };

  const handleTouchEnd = () => {
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    controlsTimeout.current = setTimeout(() => {
      if (!isZoomed) {
        setShowControls(false);
      }
    }, 2000);
  };

  // Handle image navigation with haptic feedback
  const handleNextImage = () => {
    const program = programs.find(p => p.id === selectedProgram);
    if (program) {
      setIsLoading(true);
      setCurrentImageIndex((prev) => (prev + 1) % program.images.length);
      setIsZoomed(false);
      scale.set(1);
      controls.start({ opacity: 0 });
      triggerHaptic();
    }
  };

  const handlePrevImage = () => {
    const program = programs.find(p => p.id === selectedProgram);
    if (program) {
      setIsLoading(true);
      setCurrentImageIndex((prev) => (prev - 1 + program.images.length) % program.images.length);
      setIsZoomed(false);
      scale.set(1);
      controls.start({ opacity: 0 });
      triggerHaptic();
    }
  };

  const programs = [
    {
      id: 'education',
      title: t('home.programs.education.title'),
      description: t('home.programs.education.description'),
      icon: BookOpen,
      images: [
        {
          src: '/images/programs/education/IMG_9525.JPG',
          caption: t('home.programs.education.captions.image1')
        },
        {
          src: '/images/programs/education/IMG_9524.JPG',
          caption: t('home.programs.education.captions.image2')
        },
        {
          src: '/images/programs/education/IMG_9522.JPG',
          caption: t('home.programs.education.captions.image3')
        },
        {
          src: '/images/programs/education/IMG_9521.JPG',
          caption: t('home.programs.education.captions.image4')
        },
        {
          src: '/images/programs/education/IMG_9508.JPG',
          caption: t('home.programs.education.captions.image5')
        }
      ],
      link: '/programs/education'
    },
    {
      id: 'economic',
      title: t('home.programs.economic.title'),
      description: t('home.programs.economic.description'),
      icon: Briefcase,
      images: [
        {
          src: '/images/programs/economic/Gh-xYUVXoAAsibq.jpg',
          caption: t('home.programs.economic.captions.image1')
        },
        {
          src: '/images/programs/economic/Gh-xLWqWAAAmBDa.jpg',
          caption: t('home.programs.economic.captions.image2')
        }
      ],
      link: '/programs/economic'
    },
    {
      id: 'health',
      title: t('home.programs.health.title'),
      description: t('home.programs.health.description'),
      icon: Heart,
      images: [
        {
          src: '/images/programs/health/IMG_5140.JPG',
          caption: t('home.programs.health.captions.image1')
        },
        {
          src: '/images/programs/health/Gq_e_owXEAENemn.jpg',
          caption: t('home.programs.health.captions.image2')
        },
        {
          src: '/images/programs/health/Gq_e_iDXgAAX6xa.jpg',
          caption: t('home.programs.health.captions.image3')
        },
        {
          src: '/images/programs/health/GmeYhoTWUAA5Okb.jpg',
          caption: t('home.programs.health.captions.image4')
        }
      ],
      link: '/programs/health'
    },
    {
      id: 'peace',
      title: t('home.programs.peace.title'),
      description: t('home.programs.peace.description'),
      icon: Handshake,
      images: [
        {
          src: '/images/programs/peace/IMG_9336.JPG',
          caption: t('home.programs.peace.captions.image1')
        },
        {
          src: '/images/programs/peace/IMG_9084.JPG',
          caption: t('home.programs.peace.captions.image2')
        },
        {
          src: '/images/programs/peace/Gh-i0xUXEAYDus1.jpg',
          caption: t('home.programs.peace.captions.image3')
        },
        {
          src: '/images/programs/peace/1O0A6653.JPG',
          caption: t('home.programs.peace.captions.image4')
        }
      ],
      link: '/programs/peace'
    },
    {
      id: 'culture',
      title: t('home.programs.culture.title'),
      description: t('home.programs.culture.description'),
      icon: Music,
      images: [
        {
          src: '/images/programs/culture/1O0A0313.JPG',
          caption: t('home.programs.culture.captions.image1')
        },
        {
          src: '/images/programs/culture/GpTA0d9XQAE0C1G.jpg',
          caption: t('home.programs.culture.captions.image2')
        },
        {
          src: '/images/programs/culture/Glid0MGXcAAw53H.jpg',
          caption: t('home.programs.culture.captions.image3')
        },
        {
          src: '/images/programs/culture/Gh-i0JOWMAEZ4vb.jpg',
          caption: t('home.programs.culture.captions.image4')
        }
      ],
      link: '/programs/arts'
    },
    {
      id: 'sports',
      title: t('home.programs.sports.title'),
      description: t('home.programs.sports.description'),
      icon: Trophy,
      images: [
        {
          src: '/images/programs/sport/1O0A0322.JPG',
          caption: t('home.programs.sports.captions.image1')
        },
        {
          src: '/images/programs/sport/GqE-RSyXsAAmZAY.jpg',
          caption: t('home.programs.sports.captions.image2')
        },
        {
          src: '/images/programs/sport/GqE-RSxWEAEUqod.jpg',
          caption: t('home.programs.sports.captions.image3')
        },
        {
          src: '/images/programs/sport/GqE-RSwWkAEVncq.jpg',
          caption: t('home.programs.sports.captions.image4')
        }
      ],
      link: '/programs/sports'
    }
  ];

  const handleCloseGallery = () => {
    setSelectedProgram(null);
    setCurrentImageIndex(0);
    setIsZoomed(false);
    scale.set(1);
  };

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
    scale.set(isZoomed ? 1 : 2);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('home.programs.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('home.programs.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden group">
                <img
                  src={program.images[0].src}
                  alt={program.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => handleImageClick(program.id)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <program.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {program.images.length} {t('home.programs.images')}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {program.description}
                </p>
                <div className="flex justify-between items-center">
                  <Link
                    to={program.link}
                    className="inline-flex items-center text-vjn-blue hover:text-vjn-blue-dark transition-colors duration-300"
                  >
                    {t('home.programs.learnMore')}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleImageClick(program.id)}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                  >
                    {t('home.programs.viewGallery')}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={handleCloseGallery}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div 
              className="relative max-w-6xl w-full" 
              onClick={e => e.stopPropagation()}
              drag={isMobile && !isZoomed ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={handleDragEnd}
              style={{ x, y }}
            >
              <motion.div 
                className="absolute top-4 right-4 flex gap-2 z-10"
                animate={{ opacity: showControls ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobile && (
                  <button
                    onClick={toggleFullscreen}
                    className="text-white hover:text-gray-300 bg-black/50 p-2 rounded-full"
                  >
                    {isFullscreen ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
                  </button>
                )}
                <button
                  onClick={handleZoom}
                  className="text-white hover:text-gray-300 bg-black/50 p-2 rounded-full"
                >
                  {isZoomed ? <ZoomOut className="w-6 h-6" /> : <ZoomIn className="w-6 h-6" />}
                </button>
                <button
                  onClick={handleCloseGallery}
                  className="text-white hover:text-gray-300 bg-black/50 p-2 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </motion.div>
              
              <div 
                className="relative"
                onTouchStart={(e) => {
                  handlePinchStart(e);
                  if (e.touches.length === 1) {
                    handleDoubleTap(e);
                  }
                }}
                onTouchMove={handlePinchMove}
                onTouchEnd={handlePinchEnd}
              >
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <motion.img
                  ref={imageRef}
                  src={programs.find(p => p.id === selectedProgram)?.images[currentImageIndex].src}
                  alt="Gallery"
                  className="w-full h-[80vh] object-contain cursor-zoom-in"
                  style={{ scale: springScale, opacity }}
                  onClick={handleZoom}
                  onLoad={handleImageLoad}
                  drag={isZoomed}
                  dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                  dragElastic={0.1}
                  initial={{ opacity: 0 }}
                  animate={controls}
                  transition={{ duration: 0.3 }}
                />
                
                {!isZoomed && (
                  <motion.div
                    className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4"
                    animate={{ opacity: showControls ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      onClick={handlePrevImage}
                      className="text-white hover:text-gray-300 bg-black/50 p-2 rounded-full"
                    >
                      <ChevronLeft className="w-8 h-8" />
                    </button>
                    
                    <button
                      onClick={handleNextImage}
                      className="text-white hover:text-gray-300 bg-black/50 p-2 rounded-full"
                    >
                      <ChevronRight className="w-8 h-8" />
                    </button>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showControls ? 1 : 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg max-w-2xl text-center"
                >
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    <span>
                      {programs.find(p => p.id === selectedProgram)?.images[currentImageIndex].caption}
                    </span>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                className="flex justify-center mt-4 gap-2"
                animate={{ opacity: showControls ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {programs.find(p => p.id === selectedProgram)?.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsLoading(true);
                      setCurrentImageIndex(index);
                      controls.start({ opacity: 0 });
                      triggerHaptic();
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Programs;
