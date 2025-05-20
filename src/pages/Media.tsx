import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Twitter, Instagram } from 'lucide-react';
import { ApiService } from '@/api/socialMedia';
import { SocialMediaPost } from '@/types/socialMedia';

const Media: React.FC = () => {
  const { t } = useTranslation();
  const [twitterPosts, setTwitterPosts] = useState<SocialMediaPost[]>([]);
  const [instagramPosts, setInstagramPosts] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const [twitter, instagram] = await Promise.all([
          ApiService.getTwitterPosts(),
          ApiService.getInstagramPosts()
        ]);
        setTwitterPosts(twitter);
        setInstagramPosts(instagram);
        setError(null);
      } catch (err) {
        setError('Failed to load social media posts. Please try again later.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Social Media</h1>
        <p className="text-lg text-gray-600">
          Stay connected with us on social media for the latest updates and news.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Twitter Feed */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Twitter className="w-8 h-8 text-[#1DA1F2] mr-3" />
            <h2 className="text-2xl font-semibold">Twitter Feed</h2>
          </div>
          <div className="space-y-6">
            {twitterPosts.map((post) => (
              <div key={post.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-start mb-2">
                  <img
                    src={post.authorImage}
                    alt={post.author}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-semibold">{post.author}</div>
                    <div className="text-gray-500 text-sm">{post.authorHandle}</div>
                  </div>
                </div>
                <p className="text-gray-800 mb-2">{post.content}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
                  <span className="mr-4">❤️ {post.likes}</span>
                  <span>🔄 {post.retweets}</span>
                </div>
              </div>
            ))}
          </div>
          <a
            href="https://twitter.com/visionjeunesse2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-[#1DA1F2] hover:underline"
          >
            Follow us on Twitter @visionjeunesse2
          </a>
        </div>

        {/* Instagram Feed */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Instagram className="w-8 h-8 text-[#E1306C] mr-3" />
            <h2 className="text-2xl font-semibold">Instagram Feed</h2>
          </div>
          <div className="space-y-6">
            {instagramPosts.map((post) => (
              <div key={post.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-start mb-2">
                  <img
                    src={post.authorImage}
                    alt={post.author}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-semibold">{post.author}</div>
                    <div className="text-gray-500 text-sm">{post.authorHandle}</div>
                  </div>
                </div>
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.content}
                    className="w-full h-64 object-cover rounded-lg mb-2"
                  />
                )}
                <p className="text-gray-800 mb-2">{post.caption}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
                  <span className="mr-4">❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            ))}
          </div>
          <a
            href="https://instagram.com/visionjeunesse2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-[#E1306C] hover:underline"
          >
            Follow us on Instagram @visionjeunesse2
          </a>
        </div>
      </div>
    </div>
  );
};

export default Media; 