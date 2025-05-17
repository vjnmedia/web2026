
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.programs'), path: '/programs' },
    { label: t('nav.careers'), path: '/careers' },
    { label: t('nav.media'), path: '/media' },
    { label: t('nav.contact'), path: '/contact' },
    { label: t('dashboard.title'), path: '/dashboard' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <span className="text-vjn-blue font-bold text-2xl">VJN</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="px-3 py-2 text-vjn-blue hover:bg-vjn-gray rounded-md transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
          
          {/* Donate Button */}
          <Button className="ml-2 bg-vjn-blue hover:bg-vjn-light-blue text-white">
            {t('nav.donate')}
          </Button>
          
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                <span className={language === 'en' ? 'font-bold' : ''}>English</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('fr')}>
                <span className={language === 'fr' ? 'font-bold' : ''}>Français</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          {/* Language Switcher (Mobile) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                <span className={language === 'en' ? 'font-bold' : ''}>English</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('fr')}>
                <span className={language === 'fr' ? 'font-bold' : ''}>Français</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <button onClick={toggleMenu} className="text-vjn-blue">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="container-custom py-3">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="block py-2 px-4 text-vjn-blue hover:bg-vjn-gray rounded-md"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 px-4">
              <Button className="w-full bg-vjn-blue hover:bg-vjn-light-blue text-white">
                {t('nav.donate')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
