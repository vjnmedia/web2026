import { BookOpen, Heart, Trophy, Users, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Programs = () => {
  const { t } = useLanguage();

  const programs = [
    {
      title: t('programs.education.title', 'Education Program'),
      description: t('programs.education.description', 'Empowering youth through quality education and skill development.'),
      icon: <BookOpen className="h-12 w-12 text-blue-600" />,
      color: 'blue',
      link: '/programs/education'
    },
    {
      title: t('programs.health.title', 'Health Program'),
      description: t('programs.health.description', 'Promoting youth well-being through comprehensive health services and education.'),
      icon: <Heart className="h-12 w-12 text-red-600" />,
      color: 'red',
      link: '/programs/health'
    },
    {
      title: t('programs.sportCultureArts.title', 'Sports, Culture & Arts Program'),
      description: t('programs.sportCultureArts.description', 'Nurturing talents and preserving cultural heritage through sports and arts.'),
      icon: <Trophy className="h-12 w-12 text-purple-600" />,
      color: 'purple',
      link: '/programs/sport-culture-arts'
    }
  ];

  const stats = [
    {
      value: '3+',
      label: t('programs.stats.programs', 'Programs'),
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      value: '1000+',
      label: t('programs.stats.beneficiaries', 'Beneficiaries'),
      icon: <Users className="h-6 w-6" />
    },
    {
      value: '20+',
      label: t('programs.stats.years', 'Years of Impact'),
      icon: <Trophy className="h-6 w-6" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="relative mb-16 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/90 z-10" />
        <div className="relative z-20 p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block p-3 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <BookOpen className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              {t('programs.hero.title', 'Our Programs')}
            </h1>
            <p className="text-xl mb-8 text-gray-200 leading-relaxed">
              {t('programs.hero.description', 'At Vision Jeunesse Nouvelle, we offer comprehensive programs designed to empower youth, promote well-being, and preserve cultural heritage. Our initiatives focus on education, health, sports, culture, and arts, creating opportunities for young people to thrive and contribute to their communities.')}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                  {stat.icon}
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-200">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {t('programs.intro.title', 'Empowering Youth Through Comprehensive Programs')}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {t('programs.intro.description', 'Our programs are designed to address the diverse needs of young people in Rwanda, providing them with the tools, skills, and support they need to succeed. Through education, health services, sports, and cultural activities, we create opportunities for personal growth, community engagement, and sustainable development.')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/about">
              <Button variant="outline" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-6 py-3 rounded-full">
                {t('programs.intro.learnMore', 'Learn More About Us')}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-gray-900 text-white hover:bg-gray-800 px-6 py-3 rounded-full">
                {t('programs.intro.getInvolved', 'Get Involved')}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program, index) => (
          <Link 
            key={index} 
            to={program.link}
            className="group"
          >
            <div className={`bg-gradient-to-br from-${program.color}-50 to-white rounded-2xl shadow-xl p-8 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}>
              <div className={`text-${program.color}-600 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {program.icon}
              </div>
              <h3 className={`text-2xl font-bold text-${program.color}-900 mb-4`}>
                {program.title}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {program.description}
              </p>
              <div className={`flex items-center text-${program.color}-600 font-semibold group-hover:translate-x-2 transition-transform duration-300`}>
                {t('programs.learnMore', 'Learn More')}
                <ChevronRight className="ml-2 h-5 w-5" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Call to Action Section */}
      <section className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-xl p-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-white">
            {t('programs.cta.title', 'Join Our Mission')}
          </h2>
          <p className="text-xl text-gray-200 mb-10 leading-relaxed">
            {t('programs.cta.description', 'Be part of our journey to empower youth and create positive change in our community. Your support can make a difference.')}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/volunteer">
              <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                {t('programs.cta.volunteer', 'Volunteer With Us')}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/donate">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                {t('programs.cta.donate', 'Support Our Programs')}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs; 