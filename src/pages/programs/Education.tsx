import { Book } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Education = () => {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-vjn-blue text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            filter: 'brightness(0.6)'
          }}
        ></div>
        
        <div className="container-custom relative z-20">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/programs" className="text-white/80 hover:text-white">
              {t('programs.title')}
            </Link>
            <span className="text-white/80">/</span>
            <h1 className="text-white">{t('programs.education')}</h1>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="text-blue-500 mb-4">
                <Book size={48} />
              </div>
              <h2 className="mb-4">{t('programs.education')}</h2>
              <p className="text-lg mb-6">{t('programs.education.desc')}</p>
              
              <div className="prose max-w-none">
                <h3>Our Approach</h3>
                <p>
                  We believe in providing comprehensive educational support that addresses both 
                  academic and vocational needs. Our programs are designed to be accessible, 
                  practical, and relevant to the current job market.
                </p>

                <h3>Key Initiatives</h3>
                <ul>
                  <li>Vocational training in carpentry, welding, tailoring, and computer skills</li>
                  <li>Literacy classes for youth who missed formal education</li>
                  <li>Special education initiatives for differently-abled youth</li>
                  <li>Scholarship programs for secondary and tertiary education</li>
                  <li>Mentorship and career guidance services</li>
                </ul>

                <h3>Success Stories</h3>
                <p>
                  Our education programs have helped thousands of young people gain valuable 
                  skills and find meaningful employment. Many of our graduates have gone on 
                  to start their own businesses or secure stable jobs in their chosen fields.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="mb-4">Program Impact</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-vjn-blue">2,500+</div>
                    <p className="text-sm">Youth Trained Annually</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-vjn-blue">85%</div>
                    <p className="text-sm">Employment Rate</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="mb-4">Get Involved</h3>
                <p className="mb-4">
                  There are many ways you can support our education programs:
                </p>
                <ul className="space-y-2">
                  <li>• Volunteer as a teacher or mentor</li>
                  <li>• Donate educational materials</li>
                  <li>• Sponsor a student's education</li>
                  <li>• Partner with us for vocational training</li>
                </ul>
                <div className="mt-6">
                  <Button className="bg-vjn-blue hover:bg-vjn-light-blue">
                    {t('hero.cta.volunteer')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Education;
