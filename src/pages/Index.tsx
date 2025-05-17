
import { Book, Users, Heart, Smile, Music } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import Hero from '@/components/Hero';
import ProgramCard from '@/components/ProgramCard';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { t } = useLanguage();

  const programs = [
    {
      id: 'education',
      title: t('programs.education'),
      description: t('programs.education.desc'),
      icon: <Book size={32} />,
    },
    {
      id: 'economic',
      title: t('programs.economic'),
      description: t('programs.economic.desc'),
      icon: <Users size={32} />,
    },
    {
      id: 'health',
      title: t('programs.health'),
      description: t('programs.health.desc'),
      icon: <Heart size={32} />,
    },
    {
      id: 'peace',
      title: t('programs.peace'),
      description: t('programs.peace.desc'),
      icon: <Smile size={32} />,
    },
    {
      id: 'arts',
      title: t('programs.arts'),
      description: t('programs.arts.desc'),
      icon: <Music size={32} />,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Programs Section */}
      <section className="section bg-vjn-gray">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2>{t('programs.title')}</h2>
            <p className="text-lg max-w-2xl mx-auto">{t('programs.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <ProgramCard
                key={index}
                id={program.id}
                title={program.title}
                description={program.description}
                icon={program.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2>{t('about.title')}</h2>
              <p className="text-lg mb-6">{t('about.subtitle')}</p>
              <p>{t('about.history.text')}</p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button className="bg-vjn-blue hover:bg-vjn-light-blue">
                  {t('about.history')}
                </Button>
                <Button variant="outline" className="border-vjn-blue text-vjn-blue hover:bg-vjn-blue hover:text-white">
                  {t('about.mission')}
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Youth in Rwanda"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-vjn-blue text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-white">Testimonials</h2>
            <p className="text-lg max-w-2xl mx-auto text-gray-200">
              Hear from youth who have benefited from our programs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg">
              <p className="italic text-gray-200 mb-4">
                "VJN's economic empowerment program gave me the skills and confidence to start my own business. I now employ five people from my community."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
                <div className="ml-3">
                  <p className="font-medium">Marie K.</p>
                  <p className="text-sm text-gray-300">Entrepreneur, Kigali</p>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg">
              <p className="italic text-gray-200 mb-4">
                "The peace building program helped me heal from past trauma and taught me how to be an advocate for unity in my community."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
                <div className="ml-3">
                  <p className="font-medium">Jean P.</p>
                  <p className="text-sm text-gray-300">Student, Butare</p>
                </div>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg">
              <p className="italic text-gray-200 mb-4">
                "Through VJN's sports program, I discovered my talent for football. Now I play for a national team and mentor younger athletes."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
                <div className="ml-3">
                  <p className="font-medium">Emmanuel N.</p>
                  <p className="text-sm text-gray-300">Athlete, Gisenyi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-white">
        <div className="container-custom text-center">
          <h2 className="mb-4">{t('hero.title')}</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join us in our mission to empower Rwandan youth and build a brighter future.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-vjn-blue hover:bg-vjn-light-blue">
              {t('hero.cta.join')}
            </Button>
            <Button size="lg" variant="outline" className="border-vjn-blue text-vjn-blue hover:bg-vjn-blue hover:text-white">
              {t('hero.cta.donate')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
