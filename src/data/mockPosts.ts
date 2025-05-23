import { SocialMediaPost } from '@/types/socialMedia';

export const mockPosts: SocialMediaPost[] = [
  {
    id: '1',
    content: '🎓 Exciting news! Our education program has helped 100+ students achieve their academic goals this year. Join us in making education accessible to all! #EducationForAll #VJN',
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/VJN_LOGO.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    likes: 45,
    retweets: 12,
    comments: 8,
    category: 'education'
  },
  {
    id: '2',
    content: '🏥 Our health awareness campaign in rural communities was a success! We provided free health check-ups and distributed essential medicines. Thank you to all our volunteers! #HealthForAll #VJN',
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/VJN_LOGO.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    likes: 78,
    retweets: 23,
    comments: 15,
    category: 'health'
  },
  {
    id: '3',
    content: '🎨 Cultural festival this weekend! Join us for traditional dances, music, and art exhibitions. Let\'s celebrate our rich cultural heritage together! #CultureFest #VJN',
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/VJN_LOGO.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    likes: 92,
    retweets: 34,
    comments: 21,
    category: 'culture'
  },
  {
    id: '4',
    content: '⚽ Our youth sports tournament begins next week! Register your team now and compete for the championship. Sports bring communities together! #SportsUnity #VJN',
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/VJN_LOGO.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    likes: 67,
    retweets: 19,
    comments: 12,
    category: 'sports'
  },
  {
    id: '5',
    content: '💼 New entrepreneurship workshop starting next month! Learn essential business skills and get mentorship from successful entrepreneurs. Limited spots available! #BusinessSkills #VJN',
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/VJN_LOGO.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    likes: 89,
    retweets: 27,
    comments: 18,
    category: 'economic'
  },
  {
    id: '6',
    content: '🤝 Peace building workshop this weekend! Learn conflict resolution skills and promote harmony in your community. Together we can make a difference! #PeaceBuilding #VJN',
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/VJN_LOGO.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 24 hours ago
    likes: 112,
    retweets: 45,
    comments: 29,
    category: 'peace'
  },
  {
    id: '7',
    content: '📚 Our library project has reached 5000+ books! Thanks to all donors who helped us build this knowledge hub for our community. #KnowledgeIsPower #VJN',
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/VJN_LOGO.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 36 hours ago
    likes: 156,
    retweets: 67,
    comments: 42,
    category: 'education'
  },
  {
    id: '8',
    content: '🎵 Music therapy session for children with special needs was a heartwarming success! Music has the power to heal and connect. #MusicTherapy #VJN',
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/VJN_LOGO.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 48 hours ago
    likes: 134,
    retweets: 56,
    comments: 38,
    category: 'health'
  },
  {
    id: '9',
    content: '🎭 Traditional theater performance this evening! Experience the rich cultural heritage through drama and storytelling. Free entry for all! #CulturalHeritage #VJN',
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/VJN_LOGO.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(), // 60 hours ago
    likes: 98,
    retweets: 34,
    comments: 25,
    category: 'culture'
  },
  {
    id: '10',
    content: '🏃‍♂️ Annual marathon registration is open! Run for a cause and support our youth programs. Early bird registration ends this week! #RunForYouth #VJN',
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/VJN_LOGO.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 72 hours ago
    likes: 145,
    retweets: 78,
    comments: 45,
    category: 'sports'
  },
  {
    id: '11',
    content: '💡 Innovation workshop for young entrepreneurs! Learn how to turn your ideas into successful businesses. Limited scholarships available! #InnovationHub #VJN',
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/VJN_LOGO.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 84).toISOString(), // 84 hours ago
    likes: 167,
    retweets: 89,
    comments: 52,
    category: 'economic'
  },
  {
    id: '12',
    content: '🕊️ Peace ambassadors training program starting next month! Join us in promoting peace and understanding in our communities. #PeaceAmbassadors #VJN',
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/VJN_LOGO.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 96 hours ago
    likes: 178,
    retweets: 92,
    comments: 64,
    category: 'peace'
  },
  {
    id: '13',
    content: '📝 Scholarship applications are now open! We\'re offering 50 full scholarships for deserving students. Apply now and secure your future! #EducationMatters #VJN',
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/VJN_LOGO.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 108).toISOString(), // 108 hours ago
    likes: 234,
    retweets: 156,
    comments: 89,
    category: 'education'
  },
  {
    id: '14',
    content: '🏥 Free dental check-up camp this weekend! Our medical team will provide free consultations and basic treatments. Spread the word! #HealthCare #VJN',
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/VJN_LOGO.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(), // 120 hours ago
    likes: 198,
    retweets: 112,
    comments: 76,
    category: 'health'
  },
  {
    id: '15',
    content: '🎨 Art exhibition featuring works by local artists! Support local talent and take home a piece of our cultural heritage. #LocalArt #VJN',
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/VJN_LOGO.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 132).toISOString(), // 132 hours ago
    likes: 167,
    retweets: 89,
    comments: 54,
    category: 'culture'
  },
  {
    id: '16',
    content: '⚽ Youth football tournament finals this weekend! Come support our young athletes and witness some amazing talent. #YouthSports #VJN',
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/VJN_LOGO.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 144).toISOString(), // 144 hours ago
    likes: 245,
    retweets: 134,
    comments: 98,
    category: 'sports'
  },
  {
    id: '17',
    content: '💼 Business networking event for young entrepreneurs! Connect with industry leaders and expand your professional network. #BusinessNetworking #VJN',
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/VJN_LOGO.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 156).toISOString(), // 156 hours ago
    likes: 189,
    retweets: 112,
    comments: 67,
    category: 'economic'
  },
  {
    id: '18',
    content: '🕊️ Peace march this Sunday! Join us in promoting unity and understanding in our community. Together we can make a difference! #PeaceMarch #VJN',
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/VJN_LOGO.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString(), // 168 hours ago
    likes: 278,
    retweets: 156,
    comments: 112,
    category: 'peace'
  },
  {
    id: '19',
    content: '📚 New computer lab inaugurated! Thanks to our donors, we now have a state-of-the-art facility for digital learning. #DigitalEducation #VJN',
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/VJN_LOGO.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 180).toISOString(), // 180 hours ago
    likes: 312,
    retweets: 178,
    comments: 134,
    category: 'education'
  },
  {
    id: '20',
    content: '🏥 Mental health awareness workshop this weekend! Learn about stress management and emotional well-being. Free for all participants! #MentalHealth #VJN',
    author: 'Vision Jeunesse Nouvelle',
    authorHandle: '@visionjeunesse2',
    authorImage: '/images/VJN_LOGO.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 192).toISOString(), // 192 hours ago
    likes: 267,
    retweets: 145,
    comments: 98,
    category: 'health'
  }
]; 