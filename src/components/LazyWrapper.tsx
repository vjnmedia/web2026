import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  delay?: number;
}

const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  fallback = (
    <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
    </div>
  ),
  threshold = 0.1,
  rootMargin = '50px 0px',
  className = '',
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (delay > 0) {
            setTimeout(() => setShouldRender(true), delay);
          } else {
            setShouldRender(true);
          }
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, delay]);

  return (
    <div ref={elementRef} className={className}>
      {shouldRender ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      ) : (
        fallback
      )}
    </div>
  );
};

export default LazyWrapper;


