export interface SocialMediaPost {
  id: string;
  content: string;
  author: string;
  authorHandle: string;
  authorImage: string;
  timestamp: string;
  likes: number;
  retweets: number;
  comments: number;
  category: 'education' | 'health' | 'culture' | 'sports' | 'economic' | 'peace';
} 