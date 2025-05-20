export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  replies?: Comment[];
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: 'draft' | 'published' | 'scheduled';
  featuredImage?: string;
  tags: string[];
  categories: Category[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  scheduledFor?: string;
  seoTitle?: string;
  seoDescription?: string;
  readingTime: number;
  viewCount: number;
}

export interface BlogPostFormData {
  title: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published' | 'scheduled';
  featuredImage?: string;
  tags: string[];
  categories: string[];
  scheduledFor?: string;
  seoTitle?: string;
  seoDescription?: string;
} 