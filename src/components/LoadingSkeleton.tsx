import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse'
}) => {
  const baseClasses = 'bg-gray-200';
  
  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded',
    circular: 'rounded-full',
    rounded: 'rounded-lg'
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-wave',
    none: ''
  };

  const style = {
    width: width || '100%',
    height: height || '1rem'
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );
};

// Predefined skeleton components for common use cases
export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`p-6 bg-white rounded-lg shadow ${className}`}>
    <Skeleton variant="circular" width={48} height={48} className="mb-4" />
    <Skeleton height={24} className="mb-2" />
    <Skeleton height={16} className="mb-2" />
    <Skeleton height={16} width="75%" />
  </div>
);

export const TextSkeleton: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 3, 
  className = '' 
}) => (
  <div className={className}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        height={16}
        className={`mb-2 ${index === lines - 1 ? 'w-3/4' : 'w-full'}`}
      />
    ))}
  </div>
);

export const ImageSkeleton: React.FC<{ 
  aspectRatio?: string; 
  className?: string;
  rounded?: boolean;
}> = ({ 
  aspectRatio = '16/9', 
  className = '',
  rounded = false
}) => (
  <div 
    className={`bg-gray-200 ${rounded ? 'rounded-full' : 'rounded-lg'} ${className}`}
    style={{ aspectRatio }}
  >
    <Skeleton 
      variant={rounded ? 'circular' : 'rectangular'}
      className="w-full h-full"
    />
  </div>
);

export const TableSkeleton: React.FC<{ 
  rows?: number; 
  columns?: number; 
  className?: string;
}> = ({ 
  rows = 5, 
  columns = 4, 
  className = '' 
}) => (
  <div className={`space-y-3 ${className}`}>
    {/* Header */}
    <div className="flex space-x-4">
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton key={index} height={20} className="flex-1" />
      ))}
    </div>
    
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex space-x-4">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={colIndex} height={16} className="flex-1" />
        ))}
      </div>
    ))}
  </div>
);

export const ListSkeleton: React.FC<{ 
  items?: number; 
  className?: string;
  showAvatar?: boolean;
}> = ({ 
  items = 5, 
  className = '',
  showAvatar = false
}) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="flex items-center space-x-3">
        {showAvatar && (
          <Skeleton variant="circular" width={40} height={40} />
        )}
        <div className="flex-1 space-y-2">
          <Skeleton height={16} width="60%" />
          <Skeleton height={14} width="40%" />
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;


