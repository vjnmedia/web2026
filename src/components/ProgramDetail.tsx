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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`section ${color}`}>
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className={`${iconColor} mb-8`}>
                {icon}
              </div>
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
              <p className="text-xl mb-8">{subtitle}</p>
              <Link to="/programs" className="text-vjn-blue hover:text-vjn-light-blue font-semibold">
                {t('programs.backToAll')} →
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src={imageSrc}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
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
                  <Link to="/contact" className="w-full">
                    <Button className="w-full bg-vjn-blue hover:bg-vjn-light-blue">
                      {t('programs.volunteer')}
                    </Button>
                  </Link>
                  <Link to="/donate" className="w-full">
                    <Button variant="outline" className="w-full border-vjn-blue text-vjn-blue hover:bg-vjn-blue hover:text-white">
                      {t('programs.donate')}
                    </Button>
                  </Link>
                  <Link to="/contact" className="w-full">
                    <Button variant="outline" className="w-full border-vjn-blue text-vjn-blue hover:bg-vjn-blue hover:text-white">
                      {t('programs.contactUs')}
                    </Button>
                  </Link>
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
