// Performance monitoring and optimization utilities

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeMetrics();
    this.setupObservers();
  }

  private initializeMetrics() {
    // Get basic load time
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        this.metrics.loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      }
    }
  }

  private setupObservers() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    // First Contentful Paint
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcp) {
          this.metrics.firstContentfulPaint = fcp.startTime;
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
      this.observers.push(fcpObserver);
    } catch (e) {
      console.warn('FCP observer not supported:', e);
    }

    // Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.largestContentfulPaint = lastEntry.startTime;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);
    } catch (e) {
      console.warn('LCP observer not supported:', e);
    }

    // First Input Delay
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.metrics.firstInputDelay = entry.processingStart - entry.startTime;
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);
    } catch (e) {
      console.warn('FID observer not supported:', e);
    }

    // Cumulative Layout Shift
    try {
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.metrics.cumulativeLayoutShift = clsValue;
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    } catch (e) {
      console.warn('CLS observer not supported:', e);
    }
  }

  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  getPerformanceScore(): number {
    const metrics = this.getMetrics();
    let score = 100;

    // FCP scoring (0-3s is good)
    if (metrics.firstContentfulPaint) {
      if (metrics.firstContentfulPaint > 3000) score -= 30;
      else if (metrics.firstContentfulPaint > 1500) score -= 15;
    }

    // LCP scoring (0-2.5s is good)
    if (metrics.largestContentfulPaint) {
      if (metrics.largestContentfulPaint > 4000) score -= 30;
      else if (metrics.largestContentfulPaint > 2500) score -= 15;
    }

    // FID scoring (0-100ms is good)
    if (metrics.firstInputDelay) {
      if (metrics.firstInputDelay > 300) score -= 20;
      else if (metrics.firstInputDelay > 100) score -= 10;
    }

    // CLS scoring (0-0.1 is good)
    if (metrics.cumulativeLayoutShift) {
      if (metrics.cumulativeLayoutShift > 0.25) score -= 20;
      else if (metrics.cumulativeLayoutShift > 0.1) score -= 10;
    }

    return Math.max(0, score);
  }

  reportMetrics() {
    const metrics = this.getMetrics();
    const score = this.getPerformanceScore();

    if (process.env.NODE_ENV === 'development') {
      console.group('🚀 Performance Metrics');
      console.log('Load Time:', metrics.loadTime?.toFixed(2) + 'ms');
      console.log('First Contentful Paint:', metrics.firstContentfulPaint?.toFixed(2) + 'ms');
      console.log('Largest Contentful Paint:', metrics.largestContentfulPaint?.toFixed(2) + 'ms');
      console.log('First Input Delay:', metrics.firstInputDelay?.toFixed(2) + 'ms');
      console.log('Cumulative Layout Shift:', metrics.cumulativeLayoutShift?.toFixed(4));
      console.log('Performance Score:', score + '/100');
      console.groupEnd();
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      // Here you would send metrics to your analytics service
      this.sendToAnalytics(metrics, score);
    }
  }

  private sendToAnalytics(metrics: Partial<PerformanceMetrics>, score: number) {
    // Example: Send to Google Analytics or your preferred analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'performance_metrics', {
        event_category: 'Performance',
        event_label: 'Core Web Vitals',
        value: score,
        custom_map: {
          load_time: metrics.loadTime,
          fcp: metrics.firstContentfulPaint,
          lcp: metrics.largestContentfulPaint,
          fid: metrics.firstInputDelay,
          cls: metrics.cumulativeLayoutShift
        }
      });
    }
  }

  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Image optimization utilities
export const optimizeImage = (src: string, options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}): string => {
  // In a real implementation, you would use an image optimization service
  // like Cloudinary, ImageKit, or Next.js Image Optimization
  const { width, height, quality = 75, format = 'webp' } = options;
  
  let optimizedSrc = src;
  
  // Add query parameters for optimization
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  if (quality) params.append('q', quality.toString());
  if (format) params.append('f', format);
  
  if (params.toString()) {
    optimizedSrc += (src.includes('?') ? '&' : '?') + params.toString();
  }
  
  return optimizedSrc;
};

// Lazy loading utility
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px 0px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Resource preloading
export const preloadResource = (href: string, as: string, type?: string) => {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  
  document.head.appendChild(link);
};

// Critical resource preloading
export const preloadCriticalResources = () => {
  // Preload critical fonts
  preloadResource(
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    'style'
  );

  // Preload critical images
  preloadResource('/images/VJN_LOGO.jpg', 'image');

  // Preload critical API endpoints
  preloadResource('/api/events', 'fetch');
};

// Bundle analysis helper
export const analyzeBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    // This would typically be done at build time
    console.log('Bundle analysis should be performed at build time using tools like webpack-bundle-analyzer');
  }
};

// Memory usage monitoring
export const getMemoryUsage = () => {
  if (typeof window !== 'undefined' && 'memory' in performance) {
    const memory = (performance as any).memory;
    return {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit
    };
  }
  return null;
};

// Create global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Auto-report metrics after page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      performanceMonitor.reportMetrics();
    }, 2000); // Wait 2 seconds for all metrics to be collected
  });
}


