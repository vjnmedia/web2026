
import { Book, Users, Heart, Smile, Music } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';

const Programs = () => {
  const { t } = useLanguage();
  
  const programData = [
    {
      id: 'education',
      title: t('programs.education'),
      description: t('programs.education.desc'),
      icon: <Book size={48} />,
      color: 'bg-blue-50',
      iconColor: 'text-blue-500',
      details: [
        'Vocational training in carpentry, welding, tailoring, and computer skills',
        'Literacy classes for youth who missed formal education',
        'Special education initiatives for differently-abled youth',
        'Scholarship programs for secondary and tertiary education',
        'Mentorship and career guidance services'
      ]
    },
    {
      id: 'economic',
      title: t('programs.economic'),
      description: t('programs.economic.desc'),
      icon: <Users size={48} />,
      color: 'bg-green-50',
      iconColor: 'text-green-500',
      details: [
        'Business plan development and entrepreneurship training',
        'Support for youth cooperatives and small business startups',
        'Financial literacy and savings programs',
        'Market linkage and product development assistance',
        'Microfinance and small grants for youth-led enterprises'
      ]
    },
    {
      id: 'health',
      title: t('programs.health'),
      description: t('programs.health.desc'),
      icon: <Heart size={48} />,
      color: 'bg-red-50',
      iconColor: 'text-red-500',
      details: [
        'Sexual and reproductive health education',
        'HIV/AIDS awareness and prevention programs',
        'Mental health support and trauma counseling',
        'Nutrition and physical wellness initiatives',
        'Pandemic preparedness and response training'
      ]
    },
    {
      id: 'peace',
      title: t('programs.peace'),
      description: t('programs.peace.desc'),
      icon: <Smile size={48} />,
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      details: [
        'Conflict resolution and mediation training',
        'Peace camps bringing together youth from diverse backgrounds',
        'Interfaith dialogue and cultural exchange programs',
        'Genocide memory and reconciliation initiatives',
        'Community service and social cohesion activities'
      ]
    },
    {
      id: 'arts',
      title: t('programs.arts'),
      description: t('programs.arts.desc'),
      icon: <Music size={48} />,
      color: 'bg-purple-50',
      iconColor: 'text-purple-500',
      details: [
        'Sports training and competitions in football, basketball, and volleyball',
        'Traditional dance and music preservation',
        'Visual arts and crafts workshops',
        'Theater and drama for social change',
        'Cultural festivals and community celebrations'
      ]
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
            backgroundImage: `url('https://images.unsplash.com/photo-1529333166437-7fff136f1f85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            filter: 'brightness(0.6)'
          }}
        ></div>
        
        <div className="container-custom relative z-20">
          <h1 className="text-white">{t('programs.title')}</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl">
            {t('programs.subtitle')}
          </p>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2>Our Core Programs</h2>
            <p className="max-w-3xl mx-auto text-lg">
              Vision Jeunesse Nouvelle offers five integrated programs designed to address the needs 
              of Rwandan youth holistically, empowering them to become change-makers in their communities.
            </p>
          </div>
          
          <div className="space-y-24">
            {programData.map((program, index) => (
              <div 
                key={program.id} 
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:grid-flow-dense' : ''}`}
                id={program.id}
              >
                <div className={`${index % 2 !== 0 ? 'lg:col-start-2' : ''}`}>
                  <div className={`${program.iconColor} mb-4`}>
                    {program.icon}
                  </div>
                  <h2 className="mb-4">{program.title}</h2>
                  <p className="text-lg mb-6">{program.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {program.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 text-vjn-blue">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="bg-vjn-blue hover:bg-vjn-light-blue">
                    {t('programs.learnMore')}
                  </Button>
                </div>
                
                <div className={`${index % 2 !== 0 ? 'lg:col-start-1' : ''} rounded-lg shadow-lg overflow-hidden`}>
                  <img 
                    src={`https://picsum.photos/seed/${program.id}/800/600`} 
                    alt={program.title} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section bg-vjn-gray">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2>Our Impact</h2>
            <p className="max-w-3xl mx-auto text-lg">
              VJN has been making a difference in the lives of Rwandan youth since 2002.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 text-center rounded-lg shadow-md">
              <div className="text-4xl font-bold text-vjn-blue mb-2">50,000+</div>
              <p className="text-lg">Youth reached annually</p>
            </div>
            
            <div className="bg-white p-8 text-center rounded-lg shadow-md">
              <div className="text-4xl font-bold text-vjn-blue mb-2">30</div>
              <p className="text-lg">Districts across Rwanda</p>
            </div>
            
            <div className="bg-white p-8 text-center rounded-lg shadow-md">
              <div className="text-4xl font-bold text-vjn-blue mb-2">5,000+</div>
              <p className="text-lg">Businesses started</p>
            </div>
            
            <div className="bg-white p-8 text-center rounded-lg shadow-md">
              <div className="text-4xl font-bold text-vjn-blue mb-2">20+</div>
              <p className="text-lg">Years of service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-vjn-blue text-white">
        <div className="container-custom text-center">
          <h2 className="text-white mb-4">Get Involved</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-200">
            Join us in our mission to strengthen youth for a better future. There are many ways 
            you can contribute to our programs and make a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-vjn-blue hover:bg-gray-100">
              {t('hero.cta.volunteer')}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              {t('hero.cta.donate')}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Partner With Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
