import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageContext';

interface ProgramDetailProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
  color: string;
  iconColor: string;
  imageSrc: string;
}

const ProgramDetail = ({
  id,
  title,
  subtitle,
  description,
  details,
  icon,
  color,
  iconColor,
  imageSrc
}: ProgramDetailProps) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6">
      {/* Hero Section */}
      <section className={`relative mb-4 rounded-md overflow-hidden h-72 lg:h-96 ${color}`}>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <div>
              <div className={`${iconColor} mb-3`}>
                {icon}
              </div>
              <h1 className="text-4xl font-bold mb-3 text-white">{title}</h1>
              <p className="text-lg mb-4 text-white">{subtitle}</p>
              <Link to="/programs" className="text-white hover:text-gray-200 font-semibold flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
                {t('programs.backToAll')}
              </Link>
            </div>
            <div className="relative h-80 lg:h-full hidden lg:block rounded-lg overflow-hidden">
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white px-6 py-4 mb-4 rounded-md shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className={`${iconColor} mb-3 text-2xl`}>
              {icon}
            </div>
            
            <h2 className="text-2xl font-bold mb-3 text-gray-900">{t('programs.overview')}</h2>
            <p className="text-base mb-4 text-gray-700">{description}</p>
            
            <h3 className="text-xl font-bold mb-3 text-gray-900">{t('programs.whatWeOffer')}</h3>
            
            <div className="space-y-3 mb-4">
              {details.map((detail, index) => (
                <div key={index} className="flex items-start">
                  <span className="mr-2 text-vjn-blue font-bold text-lg">•</span>
                  <p className="text-base text-gray-700">{detail}</p>
                </div>
              ))}
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('programs.impactStories')}</h3>
              <p className="text-base text-gray-700">
                {t('programs.impactStoriesText')}
              </p>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-md p-4 sticky top-24 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('programs.getInvolved')}</h3>
              <p className="mb-4 text-base text-gray-700">
                {t('programs.getInvolvedText')}
              </p>
              <div className="space-y-3">
                <Link to="/contact" className="w-full">
                  <Button className="w-full text-base bg-vjn-blue hover:bg-vjn-dark-blue text-white">
                    {t('programs.volunteer')}
                  </Button>
                </Link>
                <Link to="/donate" className="w-full">
                  <Button variant="outline" className="w-full text-base border-vjn-blue text-vjn-blue hover:bg-vjn-blue hover:text-white">
                    {t('programs.donate')}
                  </Button>
                </Link>
                <Link to="/contact" className="w-full">
                  <Button variant="outline" className="w-full text-base border-vjn-blue text-vjn-blue hover:bg-vjn-blue hover:text-white">
                    {t('programs.contactUs')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl shadow-lg p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">{t('programs.relatedPrograms')}</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          {t('programs.relatedProgramsText')}
        </p>
        <Link to="/programs">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-base font-semibold py-3 px-6 rounded-full shadow-md">
            {t('programs.viewAllPrograms')}
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default ProgramDetail;
