import { Book, Users, Heart, Smile, Music } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import Hero from '@/components/Hero';
import ProgramCard from '@/components/ProgramCard';
import LogoCarousel from '@/components/LogoCarousel';
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

      {/* Partners & Donors Section */}
      <LogoCarousel />

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
                src="images/home.jpg"
                alt="Youth in Rwanda"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-lg max-w-2xl mx-auto text-gray-300">
              Hear from youth who have transformed their lives through our programs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-emerald-600/20 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-emerald-500/30 hover:bg-emerald-600/30 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">MK</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium text-white">Marie K.</p>
                  <p className="text-sm text-emerald-200">Entrepreneur, Kigali</p>
                </div>
              </div>
              <p className="italic text-gray-200 mb-4">
                "VJN's economic empowerment program gave me the skills and confidence to start my own business. I now employ five people from my community."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-emerald-600/20 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-emerald-500/30 hover:bg-emerald-600/30 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">JP</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium text-white">Jean P.</p>
                  <p className="text-sm text-emerald-200">Student, Butare</p>
                </div>
              </div>
              <p className="italic text-gray-200 mb-4">
                "The peace building program helped me heal from past trauma and taught me how to be an advocate for unity in my community."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-emerald-600/20 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-emerald-500/30 hover:bg-emerald-600/30 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">EN</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium text-white">Emmanuel N.</p>
                  <p className="text-sm text-emerald-200">Athlete, Gisenyi</p>
                </div>
              </div>
              <p className="italic text-gray-200 mb-4">
                "Through VJN's sports program, I discovered my talent for football. Now I play for a national team and mentor younger athletes."
              </p>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-emerald-600/20 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-emerald-500/30 hover:bg-emerald-600/30 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">AU</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium text-white">Aline U.</p>
                  <p className="text-sm text-emerald-200">Tech Graduate, Kigali</p>
                </div>
              </div>
              <p className="italic text-gray-200 mb-4">
                "The digital skills training opened new opportunities for me. I now work as a software developer and help other young women enter tech."
              </p>
            </div>

            {/* Testimonial 5 */}
            <div className="bg-emerald-600/20 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-emerald-500/30 hover:bg-emerald-600/30 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">PM</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium text-white">Patrick M.</p>
                  <p className="text-sm text-emerald-200">Artist, Huye</p>
                </div>
              </div>
              <p className="italic text-gray-200 mb-4">
                "VJN's cultural program helped me develop my artistic talents. I now run a successful art studio and teach traditional dance."
              </p>
            </div>

            {/* Testimonial 6 */}
            <div className="bg-emerald-600/20 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-emerald-500/30 hover:bg-emerald-600/30 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">SN</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium text-white">Sarah N.</p>
                  <p className="text-sm text-emerald-200">Health Educator, Rubavu</p>
                </div>
              </div>
              <p className="italic text-gray-200 mb-4">
                "The health education program empowered me to become a community health educator. I now help young people make informed health choices."
              </p>
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
