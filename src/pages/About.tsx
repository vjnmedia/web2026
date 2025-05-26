import React from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { motion } from 'framer-motion';
// import { fadeIn } from '@/utils/motion'; // Removed problematic import
import { Link } from 'react-router-dom';

// Simple fade-in animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

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
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="section bg-white"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-gray-900">{t('about.history')}</h2>
              <p className="mb-4 text-gray-700">
                {t('about.history.text')}
              </p>
              <p className="mb-4 text-gray-700">
                After the 1994 genocide against the Tutsi, many Rwandan youth were left without direction, support, or hope for the future. Brother Gabriel Lauzon, a Canadian missionary, and Father Epimaque Makuza, a Rwandan priest, recognized that rebuilding the nation required investing in its young people.
              </p>
              <p className="text-gray-700">
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
      </motion.section>

      {/* Mission & Vision */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="section bg-vjn-gray"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-vjn-blue">{t('about.mission')}</h3>
              <p className="text-gray-700">
                {t('about.mission.text')}
              </p>
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2 text-gray-900">Core Values:</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
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
              <p className="mb-4 text-gray-700">
                {t('about.vision.text')}
              </p>
              <p className="mb-4 text-gray-900">
                We envision communities where:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Young people have access to quality education and training</li>
                <li>Youth are economically self-sufficient and contribute to national development</li>
                <li>Peace and reconciliation prevail among all community members</li>
                <li>Young people lead healthy lifestyles and make informed decisions</li>
                <li>Cultural heritage and artistic expression are valued and promoted</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Key Achievements */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="section bg-white"
      >
        <div className="container-custom">
          <h2 className="text-center mb-12 text-gray-900">Key Achievements in 23 Years</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* VTC Training */}
            <div className="bg-vjn-gray p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-vjn-blue mb-2">2,500+</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Youth Trained in VTC</h3>
              <p className="text-gray-700">
                Empowering over 2,500 youth with hands-on training in Automobile Mechanics, Tailoring, Welding, and Hairdressing—equipping them with skills for self-reliance and a brighter future.
              </p>
            </div>

            {/* Districts Coverage */}
            <div className="bg-vjn-gray p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-vjn-blue mb-2">10</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Districts Services Covered</h3>
              <p className="text-gray-700">
                Western Province: Rubavu and Nyabihu Districts; Southern Province: Gisagara, Nyamagabe and Huye Districts; Northern Province: Musanze and Burera Districts; Eastern Province: Nyagatare, Ngoma, and Kirehe districts.
              </p>
            </div>

            {/* Refugee Camps */}
            <div className="bg-vjn-gray p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-vjn-blue mb-2">5+</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Refugee Camps Served</h3>
              <p className="text-gray-700">
                VJN extends its impact to refugee communities, actively serving youth in Kigeme, Mugombwa, Mahama, Nyabiheke, and Kiziba camps through empowerment programs that foster skills, resilience, and hope for a better future.
              </p>
            </div>

            {/* Peacebuilding Activities */}
            <div className="bg-vjn-gray p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-vjn-blue mb-2">100+</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Peacebuilding Activities</h3>
              <p className="text-gray-700">
                Annually, the program brings together 252 participants from Rwanda (241 females and 263 males) and more than 500 youth from across the Great Lakes region.
              </p>
            </div>

            {/* Sports & Culture */}
            <div className="bg-vjn-gray p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-vjn-blue mb-2">50,000+</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Sports, Cultural & Arts Events</h3>
              <p className="text-gray-700">
                Engaging over 50,000 young people every year through Cultural & Sports Events, fostering talent, unity, and personal growth—while earning 5+ trophies annually in recognition of excellence.
              </p>
            </div>

            {/* Girls Empowerment */}
            <div className="bg-vjn-gray p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-vjn-blue mb-2">1,000+</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Girls & Young Women Empowered</h3>
              <p className="text-gray-700">
                Empowering over 1,000 girls and young women in leadership, entrepreneurship, and reproductive health.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Founding Members */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="section bg-white"
      >
        <div className="container-custom">
          <h2 className="text-center mb-12 text-gray-900">Our Founding Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Member 1 */}
            <div className="bg-vjn-gray p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Mr. Nzabonimpa Jean Bosco</h3>
              <p className="text-gray-700 mb-4">Founder & Executive Director</p>
              <p className="text-gray-700">
                A visionary leader with over 20 years of experience in youth development and community empowerment.
              </p>
            </div>

            {/* Member 2 */}
            <div className="bg-vjn-gray p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Mrs. Mukamana Marie Claire</h3>
              <p className="text-gray-700 mb-4">Co-Founder & Program Director</p>
              <p className="text-gray-700">
                Dedicated to creating sustainable programs that empower young people and build stronger communities.
              </p>
            </div>

            {/* Member 3 */}
            <div className="bg-vjn-gray p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Mr. Nzabonimpa Jean Claude</h3>
              <p className="text-gray-700 mb-4">Co-Founder & Technical Director</p>
              <p className="text-gray-700">
                Expert in vocational training and technical education, committed to developing practical skills in youth.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Link to Staff Page */}
      <motion.div 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-center py-12"
      >
        <Link
          to="/staff"
          className="inline-block bg-vjn-blue text-white text-lg font-semibold px-8 py-3 rounded-lg hover:bg-vjn-orange transition-colors duration-300"
        >
          {t('about.staffLink', 'Meet Our Staff')}
        </Link>
      </motion.div>

      {/* Impact Timeline */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="section bg-vjn-gray"
      >
        <div className="container-custom">
          <h2 className="text-center mb-12 text-gray-900">Our Journey & Impact</h2>
          
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-vjn-blue"></div>
            
            {/* 2002 */}
            <div className="relative mb-16">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-8 h-8 rounded-full bg-vjn-blue border-4 border-white z-10"></div>
              <div className="ml-8 md:ml-0 md:w-1/2 md:pr-8 md:text-right">
                <h3 className="text-xl font-bold mb-2 text-gray-900">2002</h3>
                <p className="bg-white p-4 rounded-lg shadow-md inline-block text-gray-700">
                  VJN founded by Brother Gabriel Lauzon and Father Epimaque Makuza in Kigali.
                </p>
              </div>
            </div>

            {/* 2005 */}
            <div className="relative mb-16">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-8 h-8 rounded-full bg-vjn-blue border-4 border-white z-10"></div>
              <div className="ml-8 md:ml-auto md:w-1/2 md:pl-8">
                <h3 className="text-xl font-bold mb-2 text-gray-900">2005</h3>
                <p className="bg-white p-4 rounded-lg shadow-md inline-block text-gray-700">
                  First vocational training center established, serving 50 youth.
                </p>
              </div>
            </div>

            {/* 2010 */}
            <div className="relative mb-16">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-8 h-8 rounded-full bg-vjn-blue border-4 border-white z-10"></div>
              <div className="ml-8 md:ml-0 md:w-1/2 md:pr-8 md:text-right">
                <h3 className="text-xl font-bold mb-2 text-gray-900">2010</h3>
                <p className="bg-white p-4 rounded-lg shadow-md inline-block text-gray-700">
                  Expansion to three provinces with comprehensive peace-building program.
                </p>
              </div>
            </div>

            {/* 2015 */}
            <div className="relative mb-16">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-8 h-8 rounded-full bg-vjn-blue border-4 border-white z-10"></div>
              <div className="ml-8 md:ml-auto md:w-1/2 md:pl-8">
                <h3 className="text-xl font-bold mb-2 text-gray-900">2015</h3>
                <p className="bg-white p-4 rounded-lg shadow-md inline-block text-gray-700">
                  Launch of Youth Entrepreneurship Initiative, supporting 200 small businesses.
                </p>
              </div>
            </div>

            {/* 2020 */}
            <div className="relative mb-16">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-8 h-8 rounded-full bg-vjn-blue border-4 border-white z-10"></div>
              <div className="ml-8 md:ml-0 md:w-1/2 md:pr-8 md:text-right">
                <h3 className="text-xl font-bold mb-2 text-gray-900">2020</h3>
                <p className="bg-white p-4 rounded-lg shadow-md inline-block text-gray-700">
                  COVID-19 response: Digital literacy program reaches 5,000 youth nationwide.
                </p>
              </div>
            </div>

            {/* Present */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-8 h-8 rounded-full bg-vjn-blue border-4 border-white z-10"></div>
              <div className="ml-8 md:ml-auto md:w-1/2 md:pl-8">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Today</h3>
                <p className="bg-white p-4 rounded-lg shadow-md inline-block text-gray-700">
                  Operating in all 30 districts of Rwanda, impacting over 50,000 youth annually.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
