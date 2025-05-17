
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageContext';

interface ProgramDetailProps {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
  color: string;
  iconColor: string;
  imageSrc?: string;
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
  imageSrc = `https://picsum.photos/seed/${id}/1200/600`,
}: ProgramDetailProps) => {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Section */}
      <section className={`relative ${color} py-16 md:py-24`}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('${imageSrc}')`,
            filter: 'brightness(0.7)'
          }}
        ></div>
        
        <div className="container-custom relative z-20">
          <Link to="/programs" className="inline-flex items-center text-white mb-6 hover:underline">
            <ArrowLeft className="mr-2" size={20} />
            {t('programs.backToAll')}
          </Link>
          <h1 className="text-white">{title}</h1>
          {subtitle && <p className="text-xl text-gray-200 max-w-3xl">{subtitle}</p>}
        </div>
      </section>

      {/* Program Content */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className={`${iconColor} mb-8`}>
                {icon}
              </div>
              
              <p className="text-lg mb-8">{description}</p>
              
              <h2 className="mb-4">{t('programs.whatWeOffer')}</h2>
              
              <ul className="space-y-4 mb-8">
                {details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-vjn-blue font-bold">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mb-8">
                <h3>{t('programs.impactStories')}</h3>
                <p>
                  {t('programs.impactStoriesText')}
                </p>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-vjn-gray rounded-lg p-6 sticky top-24">
                <h3 className="mb-4">{t('programs.getInvolved')}</h3>
                <p className="mb-4">
                  {t('programs.getInvolvedText')}
                </p>
                <div className="space-y-3">
                  <Button className="w-full">
                    {t('programs.volunteer')}
                  </Button>
                  <Button variant="outline" className="w-full">
                    {t('programs.donate')}
                  </Button>
                  <Button variant="outline" className="w-full">
                    {t('programs.contactUs')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-vjn-blue text-white">
        <div className="container-custom text-center">
          <h2 className="text-white mb-4">{t('programs.relatedPrograms')}</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            {t('programs.relatedProgramsText')}
          </p>
          <Link to="/programs">
            <Button size="lg" className="bg-white text-vjn-blue hover:bg-gray-100">
              {t('programs.viewAllPrograms')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProgramDetail;
