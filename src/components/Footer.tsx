import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import NewsletterSubscription from './NewsletterSubscription';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('footer.about.title')}</h3>
            <p className="text-gray-300 mb-4">{t('footer.about.description')}</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/visionjeunesse2" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com/visionjeunesse2" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com/visionjeunesse2" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com/company/visionjeunesse2" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('footer.usefulLinks.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.usefulLinks.about')}
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.usefulLinks.programs')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.usefulLinks.services')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.usefulLinks.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('footer.usefulLinks.community')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.usefulLinks.blog')}
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.usefulLinks.events')}
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.usefulLinks.volunteer')}
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.usefulLinks.donate')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">{t('newsletter.title', 'Stay Updated')}</h3>
            <p className="mb-4">{t('newsletter.description', 'Subscribe to our newsletter for updates and news.')}</p>
            <NewsletterSubscription />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Vision Jeunesse Nouvelle. {t('footer.copyright')}
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                {t('footer.terms')}
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                {t('footer.sitemap')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
