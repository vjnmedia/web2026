// Security utilities and configurations

// Content Security Policy configuration
export const CSP_CONFIG = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Required for Vite in development
    "'unsafe-eval'", // Required for Vite in development
    "https://www.paypal.com",
    "https://www.paypalobjects.com",
    "https://www.google.com",
    "https://www.gstatic.com"
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'", // Required for Tailwind CSS
    "https://fonts.googleapis.com"
  ],
  'font-src': [
    "'self'",
    "https://fonts.gstatic.com",
    "data:"
  ],
  'img-src': [
    "'self'",
    "data:",
    "https:",
    "blob:"
  ],
  'connect-src': [
    "'self'",
    "https://api.supabase.co",
    "https://*.supabase.co",
    "https://www.paypal.com",
    "https://api.paypal.com"
  ],
  'frame-src': [
    "'self'",
    "https://www.paypal.com",
    "https://www.google.com"
  ],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"]
};

// Input validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  alphanumeric: /^[a-zA-Z0-9\s]+$/,
  name: /^[a-zA-Z\s'-]+$/,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/
};

// Rate limiting configuration
export const RATE_LIMITS = {
  login: {
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    blockDurationMs: 30 * 60 * 1000 // 30 minutes
  },
  api: {
    maxRequests: 100,
    windowMs: 15 * 60 * 1000 // 15 minutes
  },
  contact: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000 // 1 hour
  }
};

// Sanitization functions
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers
};

export const sanitizeHtml = (html: string): string => {
  // Basic HTML sanitization - in production, use a library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
};

// XSS protection
export const escapeHtml = (text: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// CSRF token generation
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Password strength validation
export const validatePasswordStrength = (password: string): {
  isValid: boolean;
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) score += 1;
  else feedback.push('Password must be at least 8 characters long');

  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Password must contain at least one lowercase letter');

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Password must contain at least one uppercase letter');

  if (/[0-9]/.test(password)) score += 1;
  else feedback.push('Password must contain at least one number');

  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  else feedback.push('Password must contain at least one special character');

  return {
    isValid: score >= 4,
    score,
    feedback
  };
};

// File upload validation
export const validateFileUpload = (file: File, options: {
  maxSize: number; // in bytes
  allowedTypes: string[];
  allowedExtensions: string[];
}): { isValid: boolean; error?: string } => {
  // Check file size
  if (file.size > options.maxSize) {
    return {
      isValid: false,
      error: `File size must be less than ${Math.round(options.maxSize / 1024 / 1024)}MB`
    };
  }

  // Check file type
  if (!options.allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `File type ${file.type} is not allowed`
    };
  }

  // Check file extension
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (!extension || !options.allowedExtensions.includes(extension)) {
    return {
      isValid: false,
      error: `File extension .${extension} is not allowed`
    };
  }

  return { isValid: true };
};

// Security headers for API responses
export const getSecurityHeaders = () => ({
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': Object.entries(CSP_CONFIG)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ')
});

// Input validation helper
export const validateInput = (value: string, type: keyof typeof VALIDATION_PATTERNS): boolean => {
  const pattern = VALIDATION_PATTERNS[type];
  return pattern.test(value);
};

// SQL injection prevention (basic)
export const sanitizeForSQL = (input: string): string => {
  return input
    .replace(/['"\\]/g, '') // Remove quotes and backslashes
    .replace(/--/g, '') // Remove SQL comments
    .replace(/\/\*/g, '') // Remove SQL block comments start
    .replace(/\*\//g, ''); // Remove SQL block comments end
};


