import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, Loader2 } from 'lucide-react';
import XLogo from '../components/XLogo';
import { motion } from 'framer-motion';

declare global {
  interface Window {
    twttr: any;
  }
}

const Media: React.FC = () => {
  const { t } = useTranslation();
  const [isXLoading, setIsXLoading] = useState(true);

  useEffect(() => {
    // Facebook Script
    const facebookScript = document.createElement('script');
    facebookScript.innerHTML = `
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    `;
    document.body.appendChild(facebookScript);

    // X Script
    const script = document.createElement('script');
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    
    script.onload = () => {
      if (window.twttr) {
        window.twttr.events?.bind('rendered', () => {
          setIsXLoading(false);
        });
        window.twttr.widgets.load();
      }
    };

    document.body.appendChild(script);

    // Set a timeout to hide loading state if widget takes too long
    const timeout = setTimeout(() => {
      setIsXLoading(false);
    }, 10000); // 10 seconds timeout

    return () => {
      clearTimeout(timeout);
      const facebookScriptElement = document.getElementById('facebook-jssdk');
      if (facebookScriptElement) facebookScriptElement.remove();
      const xScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
      if (xScript) xScript.remove();
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-vjn-blue text-white py-20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-600">
              {t('media.heroTitle', 'Media & Gallery')}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              {t('media.heroSubtitle', 'Explore our stories through photos, videos, and news coverage')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rest of the content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Social Media</h1>
          <p className="text-lg text-gray-600">
            Stay connected with us on social media for the latest updates and news.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* X Feed */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <XLogo className="w-8 h-8 text-black mr-3" />
              <h2 className="text-2xl font-semibold">X</h2>
            </div>
            <div className="x-timeline-container relative" style={{ minHeight: '600px', background: '#f8f9fa' }}>
              {isXLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 bg-opacity-90 z-10">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                  <p className="text-gray-600">Loading posts...</p>
                </div>
              )}
              <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
                <div id="x-timeline">
                  <a 
                    href="https://x.com/visionjeunesse2?ref_src=twsrc%5Etfw" 
                    className="twitter-timeline" 
                    data-width="100%" 
                    data-height="600"
                    data-theme="light"
                    data-chrome="noheader nofooter noborders transparent"
                    data-dnt="true"
                    style={{ color: '#4B5563' }}
                  >
                    Posts by Vision Jeunesse Nouvelle
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Instagram Feed */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Instagram className="w-8 h-8 text-[#E1306C] mr-3" />
              <h2 className="text-2xl font-semibold">Instagram Feed</h2>
            </div>
            <div className="instagram-container" style={{ minHeight: '600px' }}>
              <iframe
                src="https://www.instagram.com/visionjeunesse2/embed"
                className="w-full h-[600px]"
                frameBorder="0"
                scrolling="no"
                allowTransparency={true}
              ></iframe>
            </div>
          </div>

          {/* Facebook Feed */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Facebook className="w-8 h-8 text-[#1877F2] mr-3" />
              <h2 className="text-2xl font-semibold">Facebook Feed</h2>
            </div>
            <div className="facebook-container" style={{ minHeight: '600px' }}>
              <div 
                className="fb-page" 
                data-href="https://www.facebook.com/visionjeunesse2"
                data-tabs="timeline"
                data-width=""
                data-height="600"
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
              >
                <blockquote 
                  cite="https://www.facebook.com/visionjeunesse2" 
                  className="fb-xfbml-parse-ignore"
                >
                  <a href="https://www.facebook.com/visionjeunesse2">Vision Jeunesse</a>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Media; 