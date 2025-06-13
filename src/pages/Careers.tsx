import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Careers = () => {
  const { t } = useTranslation();

  const opportunities = [
    {
      title: "Community Program Facilitator (Gisenyi)",
      type: "Full-time",
      location: "Gisenyi, Rwanda",
      deadline: "May 31, 2025",
      link: '/careers/1'
    },
    {
      title: "Peacebuilding Bootcamp – Kigali",
      type: "Youth Program",
      location: "Kigali, Rwanda",
      deadline: "April 15, 2024",
      link: '/careers/2'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-vjn-blue text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            filter: 'brightness(0.6)'
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-600">
              {t('careers.title', 'Join Our Team')}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {t('careers.subtitle', 'Make a difference in the lives of young people while growing your career')}
            </p>
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-24 bg-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            {t('careers.opportunities.title', 'Current Opportunities')}
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {opportunities.map((opportunity, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500"
                >
                  <h3 className="text-2xl font-semibold mb-4">{opportunity.title}</h3>
                  <div className="flex items-center text-gray-600 mb-6">
                    <span className="bg-vjn-blue/10 text-vjn-blue px-4 py-2 rounded-full text-sm font-semibold mr-4">
                      {opportunity.type}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {opportunity.location}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">Application Deadline: {opportunity.deadline}</p>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href={opportunity.link}
                    className="inline-flex items-center text-vjn-blue font-semibold hover:text-vjn-light-blue transition-colors"
                  >
                    Apply Now
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Why Join Us Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-24 bg-gray-50 relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            {t('careers.whyJoin.title', 'Why Join VJN?')}
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4">{t('careers.whyJoin.impact.title', 'Make an Impact')}</h3>
                <p className="text-gray-600">
                  {t('careers.whyJoin.impact.description', 'Help transform the lives of young people in Rwanda through meaningful work.')}
                </p>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4">{t('careers.whyJoin.growth.title', 'Professional Growth')}</h3>
                <p className="text-gray-600">
                  {t('careers.whyJoin.growth.description', 'Access training, mentorship, and opportunities to develop your skills.')}
                </p>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4">{t('careers.whyJoin.culture.title', 'Great Culture')}</h3>
                <p className="text-gray-600">
                  {t('careers.whyJoin.culture.description', 'Join a diverse team of passionate individuals working towards a common goal.')}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-24 bg-vjn-blue text-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-8"
            >
              {t('careers.cta.title', 'Ready to Make a Difference?')}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl mb-12"
            >
              {t('careers.cta.description', 'Join our team and help us create opportunities for young people in Rwanda.')}
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-vjn-blue px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
              >
                Contact Us
                <ChevronRight className="h-5 w-5 ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Careers; 