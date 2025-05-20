import { SocialMediaPost } from '@/types/socialMedia';

// Mock data
const mockTwitterPosts: SocialMediaPost[] = [
  {
    id: '1',
    content: 'Exciting news! Our youth empowerment program has reached 1000+ participants this year! 🎉',
    date: '2024-03-15T10:00:00Z',
    likes: 150,
    retweets: 45,
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/logo.png'
  },
  {
    id: '2',
    content: 'Join us for our upcoming workshop on digital skills development. Limited spots available! 💻',
    date: '2024-03-14T15:30:00Z',
    likes: 89,
    retweets: 23,
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/logo.png'
  }
];

const mockInstagramPosts: SocialMediaPost[] = [
  {
    id: '3',
    content: 'Behind the scenes of our community outreach program',
    image: '/images/community.jpg',
    caption: 'Making a difference in our community, one day at a time. #CommunityDevelopment #YouthEmpowerment',
    date: '2024-03-15T09:00:00Z',
    likes: 234,
    comments: 45,
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/logo.png'
  },
  {
    id: '4',
    content: 'Our latest training session',
    image: '/images/training.jpg',
    caption: 'Equipping young people with essential skills for the future. #SkillsDevelopment #YouthTraining',
    date: '2024-03-14T14:00:00Z',
    likes: 178,
    comments: 32,
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/logo.png'
  }
];

// Mock API handlers
export const mockApi = {
  getTwitterPosts: async (): Promise<SocialMediaPost[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTwitterPosts), 500);
    });
  },

  getInstagramPosts: async (): Promise<SocialMediaPost[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockInstagramPosts), 500);
    });
  },

  addPost: async (post: Omit<SocialMediaPost, 'id'>): Promise<SocialMediaPost> => {
    return new Promise((resolve) => {
      const newPost = {
        ...post,
        id: Math.random().toString(36).substr(2, 9)
      };
      setTimeout(() => resolve(newPost), 500);
    });
  },

  updatePost: async (id: string, post: Partial<SocialMediaPost>): Promise<SocialMediaPost> => {
    return new Promise((resolve) => {
      const updatedPost = {
        ...post,
        id
      } as SocialMediaPost;
      setTimeout(() => resolve(updatedPost), 500);
    });
  },

  deletePost: async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 500);
    });
  }
}; 