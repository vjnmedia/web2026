import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X, ChevronDown, BookOpen, Heart, Trophy, Users, Target, Clock, Award, Globe, Shield, Search, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/LanguageContext';

interface Program {
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  link: string;
}

const getPrograms = (t: (key: string, fallback: string) => string): Program[] => [
  {
    title: t('programs.education.title', 'Education Program'),
    description: t('programs.education.description', 'Empowering youth through quality education and skill development.'),
    icon: <BookOpen className="h-6 w-6 text-blue-600" />,
    color: 'blue',
    link: '/programs/education'
  },
  {
    title: t('programs.health.title', 'Health Program'),
    description: t('programs.health.description', 'Promoting youth well-being through comprehensive health services and education.'),
    icon: <Heart className="h-6 w-6 text-red-600" />,
    color: 'red',
    link: '/programs/health'
  },
  {
    title: t('programs.sportCultureArts.title', 'Sports, Culture & Arts Program'),
    description: t('programs.sportCultureArts.description', 'Nurturing talents and preserving cultural heritage through sports and arts.'),
    icon: <Trophy className="h-6 w-6 text-blue-600" />,
    color: 'blue',
    link: '/programs/sport-culture-arts'
  }
];

const ProgramsMegaMenu: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const programs = [
    {
      title: t('programs.education.title', 'Education & Vocational Training'),
      description: t('programs.education.description', 'Providing quality education and vocational training to equip youth with essential skills for future success.'),
      icon: <BookOpen className="h-6 w-6" />,
      color: 'blue',
      link: '/programs/education'
    },
    {
      title: t('programs.economic.title', 'Economic Empowerment'),
      description: t('programs.economic.description', 'Supporting youth entrepreneurship and economic development through training, mentorship, and resources.'),
      icon: <Target className="h-6 w-6" />,
      color: 'red',
      link: '/programs/economic'
    },
    {
      title: t('programs.health.title', 'Health & Well-being'),
      description: t('programs.health.description', 'Promoting physical and mental health through education, awareness, and access to healthcare services.'),
      icon: <Heart className="h-6 w-6" />,
      color: 'green',
      link: '/programs/health'
    },
    {
      title: t('programs.peace.title', 'Peace Building'),
      description: t('programs.peace.description', 'Building bridges and fostering understanding through dialogue and community engagement.'),
      icon: <Shield className="h-6 w-6" />,
      color: 'purple',
      link: '/programs/peace'
    },
    {
      title: t('programs.sportCultureArts.title', 'Sport, Culture & Arts Program'),
      description: t('programs.sportCultureArts.description', 'Fostering holistic youth development through sports, cultural activities, and arts.'),
      icon: <Trophy className="h-6 w-6" />,
      color: 'orange',
      link: '/programs/sport-culture-arts'
    }
  ];

  const handleProgramClick = (link: string) => {
    setIsOpen(false);
    navigate(link);
  };

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center text-gray-700 hover:text-vjn-blue transition-colors duration-300">
        {t('nav.programs')}
        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 mx-auto mt-2 bg-white shadow-xl border border-gray-100 rounded-xl overflow-hidden"
            style={{ 
              zIndex: 50,
              width: 'min(calc(100vw - 4rem), 1200px)',
              maxWidth: '1200px',
            }}
          >
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {programs.map((program, index) => (
                  <button
                    key={index}
                    onClick={() => handleProgramClick(program.link)}
                    className={`group block p-4 rounded-lg hover:bg-${program.color}-50 transition-all duration-300 border border-transparent hover:border-${program.color}-200 text-left`}
                  >
                    <div className={`inline-flex items-center justify-center p-2 rounded-lg bg-${program.color}-100 mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <div className={`text-${program.color}-600`}>
                        {program.icon}
                      </div>
                    </div>
                    <h3 className={`text-lg font-semibold text-${program.color}-900 mb-2 group-hover:translate-x-1 transition-transform duration-300`}>
                      {program.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {program.description}
                    </p>
                    <div className={`mt-3 flex items-center text-${program.color}-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                      {t('programs.learnMore', 'Learn More')}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleProgramClick('/programs')}
                    className="inline-flex items-center text-vjn-blue hover:text-vjn-blue-dark font-medium group"
                  >
                    {t('programs.viewAllPrograms', 'View All Programs')}
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <div className="text-sm text-gray-500">
                    {t('programs.totalPrograms', '5 Programs Available')}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ResourcesDropdown: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center text-gray-700 hover:text-vjn-blue transition-colors duration-300">
        {t('nav.resources')}
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100"
          >
            <div className="py-2">
              <Link
                to="/media"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-vjn-blue transition-colors duration-300"
              >
                {t('nav.media')}
              </Link>
              <Link
                to="/community"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-vjn-blue transition-colors duration-300"
              >
                {t('nav.community')}
              </Link>
              <Link
                to="/careers"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-vjn-blue transition-colors duration-300"
              >
                {t('nav.careers')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const programs = getPrograms(t);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      const searchContainer = document.getElementById('search-container');
      const searchButton = document.getElementById('search-button');
      
      if (mobileMenu && 
          mobileMenuButton && 
          !mobileMenu.contains(event.target as Node) && 
          !mobileMenuButton.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }

      if (searchContainer && 
          searchButton && 
          !searchContainer.contains(event.target as Node) && 
          !searchButton.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [window.location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        document.getElementById('global-search')?.focus();
      }, 100);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogin = () => {
    navigate('/login', { state: { from: window.location.pathname } });
  };

  const mainNavItems = [
    { name: t('nav.home', 'Home'), href: '/' },
    { name: t('nav.about', 'About'), href: '/about' },
    { name: t('nav.services', 'Services'), href: '/services' },
    { name: t('nav.news', 'News'), href: '/news' },
    { name: t('nav.contact', 'Contact Us'), href: '/contact' },
    { name: t('nav.impact', 'Our Impact'), href: '/impact' }
  ];

  if (user?.role === 'admin') {
    mainNavItems.push({ name: t('nav.dms', 'DMS'), href: '/dms' });
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
            {mainNavItems.slice(0, 2).map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="text-gray-700 hover:text-vjn-blue transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
            <ProgramsMegaMenu />
            {mainNavItems.slice(2).map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="text-gray-700 hover:text-vjn-blue transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
            <ResourcesDropdown />
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Button */}
            <button
              id="search-button"
              onClick={toggleSearch}
              className="p-2 text-gray-600 hover:text-vjn-blue transition-colors duration-300"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

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
              <Button onClick={handleLogin}>
                {t('nav.login')}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Search Button */}
            <button
              id="search-button"
              onClick={toggleSearch}
              className="p-2 text-gray-600 hover:text-vjn-blue focus:outline-none"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              id="mobile-menu-button"
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 hover:text-vjn-blue focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              id="search-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20 px-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsSearchOpen(false);
                }
              }}
            >
              <motion.form
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                onSubmit={handleSearch}
                className="w-full max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden"
              >
                <div className="relative">
                  <input
                    id="global-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-4 py-4 pr-12 text-lg focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Search className="h-6 w-6" />
                  </button>
                </div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {mainNavItems.slice(0, 2).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-vjn-blue hover:bg-gray-50"
                      onClick={toggleMobileMenu}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="px-3 py-2">
                    <div className="text-base font-medium text-gray-700">{t('nav.programs')}</div>
                    <div className="pl-4 space-y-1 mt-2">
                      {programs.map((program, index) => (
                        <Link
                          key={index}
                          to={program.link}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-vjn-blue hover:bg-gray-50 rounded-md"
                          onClick={toggleMobileMenu}
                        >
                          <span className={`inline-block mr-2 text-${program.color}-600`}>
                            {program.icon}
                          </span>
                          {program.title}
                        </Link>
                      ))}
                      <Link
                        to="/programs"
                        className="block px-3 py-2 text-sm text-vjn-blue hover:text-vjn-blue-dark font-medium"
                        onClick={toggleMobileMenu}
                      >
                        {t('programs.viewAllPrograms')}
                      </Link>
                    </div>
                  </div>
                </motion.div>
                {mainNavItems.slice(2).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 3) * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-vjn-blue hover:bg-gray-50"
                      onClick={toggleMobileMenu}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                {/* Resources Dropdown in Mobile Menu */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (mainNavItems.length + 3) * 0.1 }}
                >
                  <div className="px-3 py-2">
                    <div className="text-base font-medium text-gray-700">{t('nav.resources')}</div>
                    <div className="pl-4 space-y-1 mt-2">
                      <Link
                        to="/media"
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-vjn-blue hover:bg-gray-50 rounded-md"
                        onClick={toggleMobileMenu}
                      >
                        {t('nav.media')}
                      </Link>
                      <Link
                        to="/community"
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-vjn-blue hover:bg-gray-50 rounded-md"
                        onClick={toggleMobileMenu}
                      >
                        {t('nav.community')}
                      </Link>
                      <Link
                        to="/careers"
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-vjn-blue hover:bg-gray-50 rounded-md"
                        onClick={toggleMobileMenu}
                      >
                        {t('nav.careers')}
                      </Link>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: mainNavItems.length * 0.1 }}
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
                    <Button onClick={handleLogin} className="w-full">
                      {t('nav.login')}
                    </Button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
