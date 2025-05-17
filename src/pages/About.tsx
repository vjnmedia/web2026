
import { useLanguage } from '@/components/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-vjn-blue text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            filter: 'brightness(0.6)'
          }}
        ></div>
        
        <div className="container-custom relative z-20">
          <h1 className="text-white">{t('about.title')}</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2>{t('about.history')}</h2>
              <p className="mb-4">
                {t('about.history.text')}
              </p>
              <p className="mb-4">
                After the 1994 genocide against the Tutsi, many Rwandan youth were left without direction, support, or hope for the future. Brother Gabriel Lauzon, a Canadian missionary, and Father Epimaque Makuza, a Rwandan priest, recognized that rebuilding the nation required investing in its young people.
              </p>
              <p>
                Starting with informal gatherings and skill-building workshops, their initiative gradually evolved into a structured organization addressing various aspects of youth development—from education and economic empowerment to peace-building, health promotion, and cultural expression.
              </p>
            </div>
            <div className="order-first lg:order-last">
              <img
                src="https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="VJN History"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-vjn-gray">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-vjn-blue">{t('about.mission')}</h3>
              <p>
                {t('about.mission.text')}
              </p>
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Core Values:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Integrity and transparency in all operations</li>
                  <li>Respect for diversity and cultural heritage</li>
                  <li>Youth participation and leadership</li>
                  <li>Collaboration with communities and partners</li>
                  <li>Sustainability and long-term impact</li>
                </ul>
              </div>
            </div>
            
            {/* Vision */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-vjn-blue">{t('about.vision')}</h3>
              <p className="mb-4">
                {t('about.vision.text')}
              </p>
              <p className="mb-4">
                We envision communities where:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Young people have access to quality education and training</li>
                <li>Youth are economically self-sufficient and contribute to national development</li>
                <li>Peace and reconciliation prevail among all community members</li>
                <li>Young people lead healthy lifestyles and make informed decisions</li>
                <li>Cultural heritage and artistic expression are valued and promoted</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Members */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="text-center mb-12">Founding Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Brother Gabriel Lauzon */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-40 h-40 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                <div className="w-full h-full bg-gray-300"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Brother Gabriel Lauzon</h3>
                <p className="mb-4">
                  A Canadian missionary who came to Rwanda in the late 1990s, Brother Gabriel was moved by the plight of youth in post-genocide Rwanda. With a background in education and community development, he dedicated his life to creating opportunities for young Rwandans to heal, learn, and grow.
                </p>
                <p>
                  His vision of a youth-led renaissance in Rwanda became the foundation of VJN's approach to empowerment and community engagement.
                </p>
              </div>
            </div>

            {/* Father Epimaque Makuza */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-40 h-40 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                <div className="w-full h-full bg-gray-300"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Father Epimaque Makuza</h3>
                <p className="mb-4">
                  A Rwandan priest who survived the genocide, Father Epimaque witnessed firsthand the devastation of his country and the trauma experienced by its youth. His deep understanding of Rwandan culture and society, combined with his pastoral commitment to healing and reconciliation, provided essential guidance for VJN's development.
                </p>
                <p>
                  Father Epimaque's emphasis on peace-building and cultural identity continues to influence VJN's holistic approach to youth development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Timeline */}
      <section className="section bg-vjn-gray">
        <div className="container-custom">
          <h2 className="text-center mb-12">Our Journey & Impact</h2>
          
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-vjn-blue"></div>
            
            {/* 2002 */}
            <div className="relative mb-16">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-8 h-8 rounded-full bg-vjn-blue border-4 border-white z-10"></div>
              <div className="ml-8 md:ml-0 md:w-1/2 md:pr-8 md:text-right">
                <h3 className="text-xl font-bold mb-2">2002</h3>
                <p className="bg-white p-4 rounded-lg shadow-md inline-block">
                  VJN founded by Brother Gabriel Lauzon and Father Epimaque Makuza in Kigali.
                </p>
              </div>
            </div>
            
            {/* 2005 */}
            <div className="relative mb-16">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-8 h-8 rounded-full bg-vjn-blue border-4 border-white z-10"></div>
              <div className="ml-8 md:ml-auto md:w-1/2 md:pl-8">
                <h3 className="text-xl font-bold mb-2">2005</h3>
                <p className="bg-white p-4 rounded-lg shadow-md inline-block">
                  First vocational training center established, serving 50 youth.
                </p>
              </div>
            </div>
            
            {/* 2010 */}
            <div className="relative mb-16">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-8 h-8 rounded-full bg-vjn-blue border-4 border-white z-10"></div>
              <div className="ml-8 md:ml-0 md:w-1/2 md:pr-8 md:text-right">
                <h3 className="text-xl font-bold mb-2">2010</h3>
                <p className="bg-white p-4 rounded-lg shadow-md inline-block">
                  Expansion to three provinces with comprehensive peace-building program.
                </p>
              </div>
            </div>
            
            {/* 2015 */}
            <div className="relative mb-16">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-8 h-8 rounded-full bg-vjn-blue border-4 border-white z-10"></div>
              <div className="ml-8 md:ml-auto md:w-1/2 md:pl-8">
                <h3 className="text-xl font-bold mb-2">2015</h3>
                <p className="bg-white p-4 rounded-lg shadow-md inline-block">
                  Launch of Youth Entrepreneurship Initiative, supporting 200 small businesses.
                </p>
              </div>
            </div>
            
            {/* 2020 */}
            <div className="relative mb-16">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-8 h-8 rounded-full bg-vjn-blue border-4 border-white z-10"></div>
              <div className="ml-8 md:ml-0 md:w-1/2 md:pr-8 md:text-right">
                <h3 className="text-xl font-bold mb-2">2020</h3>
                <p className="bg-white p-4 rounded-lg shadow-md inline-block">
                  COVID-19 response: Digital literacy program reaches 5,000 youth nationwide.
                </p>
              </div>
            </div>
            
            {/* Present */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-8 h-8 rounded-full bg-vjn-blue border-4 border-white z-10"></div>
              <div className="ml-8 md:ml-auto md:w-1/2 md:pl-8">
                <h3 className="text-xl font-bold mb-2">Today</h3>
                <p className="bg-white p-4 rounded-lg shadow-md inline-block">
                  Operating in all 30 districts of Rwanda, impacting over 50,000 youth annually.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
