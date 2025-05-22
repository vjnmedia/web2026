import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Briefcase, 
  Heart, 
  HeartHandshake, 
  Music,
  ArrowRight
} from 'lucide-react';
import { useEffect } from 'react';

const Programs = () => {
  const { t, i18n } = useTranslation();

  // Debug translations
  useEffect(() => {
    console.log('Current language:', i18n.language);
    console.log('Available languages:', i18n.languages);
    console.log('Translation test:', t('programs.title'));
  }, [i18n.language, t]);

  const programData = [
    {
      id: 'education',
      icon: GraduationCap,
      color: 'bg-blue-500',
      image: '/images/programs/education.jpg'
    },
    {
      id: 'economic',
      icon: Briefcase,
      color: 'bg-green-500',
      image: '/images/programs/economic.jpg'
    },
    {
      id: 'health',
      icon: Heart,
      color: 'bg-red-500',
      image: '/images/programs/health.jpg'
    },
    {
      id: 'peace',
      icon: HeartHandshake,
      color: 'bg-purple-500',
      image: '/images/programs/peace.jpg'
    },
    {
      id: 'arts',
      icon: Music,
      color: 'bg-yellow-500',
      image: '/images/programs/arts.jpg'
    }
  ];

  const ProgramCard = ({ program }: { program: typeof programData[0] }) => {
    const Icon = program.icon;
    const titleKey = `programs.${program.id}.title`;
    const descriptionKey = `programs.${program.id}.description`;
    const readMoreKey = `programs.${program.id}.readMore`;

    // Debug translation keys
    console.log(`Translation for ${titleKey}:`, t(titleKey));
    console.log(`Translation for ${descriptionKey}:`, t(descriptionKey));
    console.log(`Translation for ${readMoreKey}:`, t(readMoreKey));

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
        <div className="relative h-48">
          <img 
            src={program.image} 
            alt={t(titleKey)} 
            className="w-full h-full object-cover"
          />
          <div className={`absolute top-4 left-4 p-3 rounded-full ${program.color} text-white`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">
            {t(titleKey)}
          </h3>
          <p className="text-gray-600 mb-4">
            {t(descriptionKey)}
          </p>
          <Link 
            to={`/programs/${program.id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            {t(readMoreKey)}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">
            {t('programs.title')}
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            {t('programs.subtitle')}
          </p>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programData.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('programs.cta.title')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('programs.cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              {t('programs.cta.join')}
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              {t('programs.cta.contact')}
            </Link>
            <Link
              to="/donate"
              className="bg-yellow-500 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
            >
              {t('programs.cta.support')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programs;
