
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-vjn-blue text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">VJN</h3>
            <p className="mb-4 text-gray-300">
              Vision Jeunesse Nouvelle is dedicated to empowering youth through various programs, 
              fostering peace, promoting economic development, and nurturing leadership.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white hover:text-gray-300" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-gray-300" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-white hover:text-gray-300" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">{t('nav.about')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  {t('about.history')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  {t('about.mission')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  {t('about.vision')}
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.programs')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">{t('programs.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/programs" className="text-gray-300 hover:text-white transition-colors">
                  {t('programs.education')}
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-gray-300 hover:text-white transition-colors">
                  {t('programs.economic')}
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-gray-300 hover:text-white transition-colors">
                  {t('programs.health')}
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-gray-300 hover:text-white transition-colors">
                  {t('programs.peace')}
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-gray-300 hover:text-white transition-colors">
                  {t('programs.arts')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">{t('contact.title')}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span>{t('contact.address.value')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="flex-shrink-0" />
                <span>+250 788 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="flex-shrink-0" />
                <span>info@vjn.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Vision Jeunesse Nouvelle. {t('footer.rights')}
          </p>
          <div className="flex mt-4 md:mt-0 space-x-4 text-sm">
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
