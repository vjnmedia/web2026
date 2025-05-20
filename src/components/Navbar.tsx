import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/LanguageContext';

const Navbar = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      
      if (mobileMenu && 
          mobileMenuButton && 
          !mobileMenu.contains(event.target as Node) && 
          !mobileMenuButton.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [window.location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { to: '/about', label: t('nav.about') },
    { to: '/programs', label: t('nav.programs') },
    { to: '/services', label: t('nav.services') },
    { to: '/media', label: t('nav.media') },
    { to: '/news', label: t('nav.news') },
    { to: '/resources', label: t('nav.resources') },
    { to: '/contact', label: t('nav.contact') },
    { 
      to: 'https://chat.visionjeunessenouvelle.org.rw', 
      label: t('nav.community'),
      external: true 
    },
    { 
      to: 'https://jobs.visionjeunessenouvelle.org.rw', 
      label: t('nav.careers'),
      external: true 
    }
  ];

  if (user?.role === 'admin') {
    navLinks.push({ to: '/dms', label: t('nav.dms') });
  }

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center group transition-transform duration-300 hover:scale-105"
          >
            <img 
              src="/images/VJN_LOGO.jpg" 
              alt="VJN Logo" 
              className="h-14 w-auto md:h-16 lg:h-20 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link, index) => (
              link.external ? (
                <a
                  key={index}
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-vjn-blue transition-colors duration-300"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={index}
                  to={link.to}
                  className="text-gray-700 hover:text-vjn-blue transition-colors duration-300"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative group">
              <Button variant="outline" className="flex items-center">
                {language.toUpperCase()}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <div className="absolute right-0 mt-2 w-24 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button 
                  onClick={() => setLanguage('en')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  English
                </button>
                <button 
                  onClick={() => setLanguage('fr')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Français
                </button>
              </div>
            </div>
            
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline">{t('nav.dashboard')}</Button>
                </Link>
                <Button onClick={logout} variant="destructive">
                  {t('nav.logout')}
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button>{t('nav.login')}</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-button"
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-vjn-blue focus:ring-opacity-50"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6 text-gray-700" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6 text-gray-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="md:hidden absolute left-0 right-0 bg-white shadow-lg border-t"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="space-y-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {link.external ? (
                        <a
                          href={link.to}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between text-gray-700 hover:text-vjn-blue transition-colors duration-300 py-2"
                          onClick={toggleMobileMenu}
                        >
                          <span>{link.label}</span>
                          <ChevronDown className="h-4 w-4 transform rotate-[-90deg]" />
                        </a>
                      ) : (
                        <Link
                          to={link.to}
                          className="flex items-center justify-between text-gray-700 hover:text-vjn-blue transition-colors duration-300 py-2"
                          onClick={toggleMobileMenu}
                        >
                          <span>{link.label}</span>
                          <ChevronDown className="h-4 w-4 transform rotate-[-90deg]" />
                        </Link>
                      )}
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                    className="pt-4 border-t"
                  >
                    {user ? (
                      <div className="space-y-2">
                        <Link to="/dashboard" className="block">
                          <Button variant="outline" className="w-full">
                            {t('nav.dashboard')}
                          </Button>
                        </Link>
                        <Button onClick={logout} variant="destructive" className="w-full">
                          {t('nav.logout')}
                        </Button>
                      </div>
                    ) : (
                      <Link to="/login" className="block" onClick={toggleMobileMenu}>
                        <Button className="w-full">{t('nav.login')}</Button>
                      </Link>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
