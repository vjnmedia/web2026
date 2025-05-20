export interface SocialMediaPost {
  id: string;
  content: string;
  image?: string;
  caption?: string;
  date: string;
  likes: number;
  retweets?: number;
  comments?: number;
  author: string;
  authorHandle: string;
  authorImage: string;
} 