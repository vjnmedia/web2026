import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Sitemap: React.FC = () => {
  const { t } = useTranslation();

  const sitemapData = [
    {
      title: 'Main Pages',
      links: [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Impact', path: '/impact' },
        { name: 'Contact', path: '/contact' },
        { name: 'Media', path: '/media' },
        { name: 'News', path: '/news' },
      ]
    },
    {
      title: 'Programs',
      links: [
        { name: 'All Programs', path: '/programs' },
        { name: 'Education', path: '/programs/education' },
        { name: 'Economic Empowerment', path: '/programs/economic' },
        { name: 'Health', path: '/programs/health' },
        { name: 'Peace Building', path: '/programs/peace' },
        { name: 'Sports, Culture & Arts', path: '/programs/culture' },
      ]
    },
    {
      title: 'Get Involved',
      links: [
        { name: 'Volunteer', path: '/volunteer' },
        { name: 'Donate', path: '/donate' },
        { name: 'Events', path: '/events' },
        { name: 'Community', path: '/community' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', path: '/blog' },
        { name: 'Resources', path: '/resources' },
        { name: 'FAQs', path: '/faqs' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Sitemap</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sitemapData.map((section, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-4 text-vjn-blue">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.path}
                        className="flex items-center text-gray-600 hover:text-vjn-blue transition-colors group"
                      >
                        <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Sitemap; 