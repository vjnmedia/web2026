import React from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { motion } from 'framer-motion';
import { BarChart2, Users, Globe, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDonation } from '@/components/DonationContext';

interface ImpactMetric {
  icon: React.ReactNode;
  number: string;
  label: string;
}

interface SuccessStory {
  id: number;
  name: string;
  role: string;
  program: string;
  image: string;
  quote: string;
  impact: string;
}

const Impact = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { openDonationModal } = useDonation();

  const handleVolunteer = () => {
    navigate('/careers', { state: { section: 'volunteer' } });
  };

  const handleDonate = () => {
    openDonationModal();
  };

  const impactMetrics: ImpactMetric[] = [
    {
      icon: <Users className="h-8 w-8 text-vjn-blue" />,
      number: "5,000+",
      label: t('impact.metrics.youthServed', 'Youth Served')
    },
    {
      icon: <Globe className="h-8 w-8 text-vjn-blue" />,
      number: "30+",
      label: t('impact.metrics.communities', 'Communities Impacted')
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-vjn-blue" />,
      number: "85%",
      label: t('impact.metrics.success', 'Program Success Rate')
    },
    {
      icon: <Sparkles className="h-8 w-8 text-vjn-blue" />,
      number: "100+",
      label: t('impact.metrics.initiatives', 'Youth Initiatives')
    }
  ];

  const successStories: SuccessStory[] = [
    {
      id: 1,
      name: "HAKIZIMANA Erast",
      role: t('impact.stories.role.entrepreneur', 'Youth Entrepreneur'),
      program: t('impact.stories.program.livestock', 'Livestock Program'),
      image: "https://i.postimg.cc/qv4nqcsX/1O0A9241.jpg",
      quote: t('impact.stories.hakizimana.quote', "Through VJN's livestock program, I started a successful poultry business. Now I manage a thriving chicken farm that provides both eggs and meat to our local community."),
      impact: t('impact.stories.hakizimana.impact', "From a program participant to a successful farmer, Erast's poultry business has become a model for youth in agriculture.")
    },
    {
      id: 2,
      name: "Niyonsenga David",
      role: t('impact.stories.role.manufacturer', 'Small Industry Owner'),
      program: t('impact.stories.program.industry', 'Homemade Industry'),
      image: "https://visionjeunessenouvelle.org.rw/wp-content/uploads/2024/03/david-success-story.jpg",
      quote: t('impact.stories.david.quote', "VJN's entrepreneurship training gave me the skills to start my soap production business. Today, I produce quality soap products that serve our community's needs while creating employment opportunities."),
      impact: t('impact.stories.david.impact', "David's soap production business has grown to employ other youth and contributes to local economic development.")
    },
    {
      id: 3,
      name: "NIYONKURU Olivier",
      role: t('impact.stories.role.farmer', 'Agricultural Entrepreneur'),
      program: t('impact.stories.program.agriculture', 'Agricultural Program'),
      image: "https://i.postimg.cc/yYtRX4Cj/1O0A6853.jpg",
      quote: t('impact.stories.olivier.quote', "The agricultural training and support from VJN helped me establish my farming enterprise. I've learned modern farming techniques and business management skills."),
      impact: t('impact.stories.olivier.impact', "Olivier has become a successful farmer, implementing modern agricultural practices and inspiring other youth to consider farming as a viable career.")
    },
    {
      id: 4,
      name: "UWIMANA Abdoulah",
      role: t('impact.stories.role.technician', 'Electronics Entrepreneur'),
      program: t('impact.stories.program.technical', 'Technical Training'),
      image: "https://i.postimg.cc/cCC01M0C/IMG-0048.jpg",
      quote: t('impact.stories.abdoulah.quote', "VJN's technical training program equipped me with the skills to start my electronics repair business. Now I provide essential services to my community while building a sustainable enterprise."),
      impact: t('impact.stories.abdoulah.impact', "Abdoulah's electronics business has grown into a trusted service provider, demonstrating the success of youth in technical enterprises.")
    }
  ];

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('impact.hero.title', 'Our Impact')}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              {t('impact.hero.subtitle', 'Transforming lives and building stronger communities through youth empowerment')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <div className="flex justify-center mb-4">{metric.icon}</div>
                <h3 className="text-3xl font-bold text-vjn-blue mb-2">{metric.number}</h3>
                <p className="text-gray-600">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {t('impact.stories.title', 'Success Stories')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('impact.stories.subtitle', 'Meet the inspiring individuals who have transformed their lives through our programs')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{story.name}</h3>
                  <p className="text-vjn-blue mb-1">{story.role}</p>
                  <p className="text-gray-500 text-sm mb-4">{story.program}</p>
                  <blockquote className="text-gray-600 italic mb-4">
                    "{story.quote}"
                  </blockquote>
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-500">{story.impact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Impact Section */}
      <section className="py-16 bg-vjn-blue text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {t('impact.annual.title', '2023 Impact Highlights')}
            </h2>
            <p className="max-w-2xl mx-auto">
              {t('impact.annual.subtitle', 'Key achievements and milestones from our programs')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                {t('impact.annual.education.title', 'Education & Skills')}
              </h3>
              <ul className="space-y-2">
                <li>{t('impact.annual.education.point1', '200+ youth completed vocational training')}</li>
                <li>{t('impact.annual.education.point2', '85% employment rate among graduates')}</li>
                <li>{t('impact.annual.education.point3', '3 new training programs launched')}</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                {t('impact.annual.economic.title', 'Economic Empowerment')}
              </h3>
              <ul className="space-y-2">
                <li>{t('impact.annual.economic.point1', '150+ youth-led businesses established')}</li>
                <li>{t('impact.annual.economic.point2', '25 successful GSLA groups formed')}</li>
                <li>{t('impact.annual.economic.point3', '90% loan repayment rate achieved')}</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                {t('impact.annual.health.title', 'Health & Well-being')}
              </h3>
              <ul className="space-y-2">
                <li>{t('impact.annual.health.point1', '1000+ youth reached through health education')}</li>
                <li>{t('impact.annual.health.point2', '50 new peer educators trained')}</li>
                <li>{t('impact.annual.health.point3', '5 health awareness campaigns conducted')}</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                {t('impact.annual.peace.title', 'Peace Building')}
              </h3>
              <ul className="space-y-2">
                <li>{t('impact.annual.peace.point1', '20 community peace initiatives launched')}</li>
                <li>{t('impact.annual.peace.point2', '300+ youth trained in conflict resolution')}</li>
                <li>{t('impact.annual.peace.point3', '15 cross-community dialogues facilitated')}</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                {t('impact.annual.arts.title', 'Sports, Culture & Arts')}
              </h3>
              <ul className="space-y-2">
                <li>{t('impact.annual.arts.point1', '10 cultural events organized with 5000+ attendees')}</li>
                <li>{t('impact.annual.arts.point2', '8 sports teams formed across different disciplines')}</li>
                <li>{t('impact.annual.arts.point3', '3 art exhibitions showcasing youth talent')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('impact.cta.title', 'Be Part of Our Impact')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            {t('impact.cta.description', 'Join us in creating positive change. Whether through volunteering, donating, or partnering, your support makes a difference.')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVolunteer}
              className="bg-vjn-blue text-white px-8 py-3 rounded-lg hover:bg-vjn-light-blue transition-colors"
            >
              {t('impact.cta.volunteer', 'Volunteer With Us')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDonate}
              className="bg-white text-vjn-blue border-2 border-vjn-blue px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {t('impact.cta.donate', 'Make a Donation')}
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact; 