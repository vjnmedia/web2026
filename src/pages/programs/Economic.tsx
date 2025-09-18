import { TrendingUp, Users, Target, Clock, Award, Globe, Heart, Shield, BookOpen, ChevronRight, Briefcase, Hammer, DollarSign, FileText, UserCheck, Download } from 'lucide-react';
import ProgramDetail from '@/components/ProgramDetail';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ProgramsSidebar from '@/components/ProgramsSidebar';

const Economic = () => {
  const { t } = useLanguage();
  
  const economicDetails = [
    t('programs.economic.details.background', 'The Economic Empowerment program was established in 2012 as the fourth branch of VJN, alongside Education, Peace Building, and Sports, Culture & Arts. Recognizing that many youth come from vulnerable families, orphans, and unemployed backgrounds, VJN established this program to enhance their capabilities.'),
    t('programs.economic.details.initial', 'The program started by supporting 120 orphans and vulnerable children through FHI 360, providing school fees, materials, food, and housing. These families were organized into six savings and credit groups in Rubavu District, Gisenyi, Rugerero, and Nyamyumba sectors.'),
    t('programs.economic.details.expansion', 'VJN has helped youth become self-employed through USAID-funded training in the HUGUKA DUKORE AKAZI KANOZE project. The organization also supports young mothers and their parents through savings and credit groups with MISEREOR and IMBUTO FOUNDATION.'),
    t('programs.economic.details.current', 'Currently, VJN has over 200 savings and credit groups across the country, expanding from the initial three sectors in Rubavu District.')
  ];

  const objectives = [
    t('programs.economic.objectives.main', 'To advance partners and provide youth with knowledge to help them find paid employment or become self-employed, aiming to reduce youth unemployment.'),
    t('programs.economic.objectives.specific1', 'Train youth with knowledge to help them face life challenges, find employment, or start profitable businesses.'),
    t('programs.economic.objectives.specific2', 'Enhance facilitators\' knowledge to help organize youth into savings and credit groups, monitor them, and help them discover opportunities that can generate income.'),
    t('programs.economic.objectives.specific3', 'Encourage and facilitate youth to organize into savings and credit groups using technology to prevent conflicts among them.'),
    t('programs.economic.objectives.specific4', 'Help groups that have completed the savings phase to distribute their assets.'),
    t('programs.economic.objectives.specific5', 'Bring together implementing agencies and youth, especially the unemployed, to help them find paid employment and improve their interaction with VJN.'),
    t('programs.economic.objectives.specific6', 'Support youth with innovative and profitable projects through competitions.'),
    t('programs.economic.objectives.specific7', 'Encourage youth to participate in government programs.'),
    t('programs.economic.objectives.specific8', 'Visit and monitor partners\' activities to support their sustainability.'),
    t('programs.economic.objectives.specific9', 'Establish exemplary income-generating activities within VJN for its learners.')
  ];

  const targetGroups = {
    direct: [
      t('programs.economic.target.direct.facilitators', 'Facilitators'),
      t('programs.economic.target.direct.youth', 'Youth'),
      t('programs.economic.target.direct.adults', 'Adults (both genders)'),
      t('programs.economic.target.direct.employed', 'Employed and unemployed'),
      t('programs.economic.target.direct.disabled', 'People with and without disabilities')
    ],
    indirect: [
      t('programs.economic.target.indirect.authorities', 'Government authorities'),
      t('programs.economic.target.indirect.financial', 'Financial institutions'),
      t('programs.economic.target.indirect.ngos', 'NGOs'),
      t('programs.economic.target.indirect.private', 'Private sector')
    ]
  };

  const services = [
    {
      title: t('programs.economic.services.training.title', 'Training Programs'),
      items: [
        { name: 'WRN (Akazi Kanoze)', duration: '20 days' },
        { name: 'BYOB (Kora Wikorera)', duration: '15 days' },
        { name: 'GSFW (Tegura umurimo)', duration: '15 days' },
        { name: 'SYB (Gutangira igikorwa)', duration: '9 days' },
        { name: 'IYB (Kunoza igikorwa)', duration: '9 days' },
        { name: 'Life Skills', duration: '9 days' },
        { name: 'I am Entrepreneur', duration: '9 days' },
        { name: 'Digital Skills', duration: '9 days' },
        { name: 'Business Recovery', duration: '15 days' }
      ]
    },
    {
      title: t('programs.economic.services.support.title', 'Support Services'),
      items: [
        { name: t('programs.economic.services.support.meetings', 'Youth-Entrepreneur Meetings'), duration: '2 times per year' },
        { name: t('programs.economic.services.support.funding', 'Project Funding'), duration: '1 time' },
        { name: t('programs.economic.services.support.monitoring', 'Activity Monitoring'), duration: 'Throughout agreement' }
      ]
    }
  ];

  const activities = [
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: t('programs.economic.activities.trainingTitle', 'Vocational Training'),
      description: t('programs.economic.activities.trainingDescription', 'Providing hands-on training in various vocational skills to enhance employability.'),
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: t('programs.economic.activities.mentorshipTitle', 'Mentorship & Coaching'),
      description: t('programs.economic.activities.mentorshipDescription', 'Offering personalized mentorship and coaching to guide youth in their entrepreneurial journeys.'),
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: t('programs.economic.activities.marketAccessTitle', 'Market Access Support'),
      description: t('programs.economic.activities.marketAccessDescription', 'Facilitating access to markets and business opportunities for young entrepreneurs.'),
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: t('programs.economic.activities.financialLiteracyTitle', 'Financial Literacy Workshops'),
      description: t('programs.economic.activities.financialLiteracyDescription', 'Conducting workshops to equip youth with essential financial management skills.'),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-2">
      <div className="flex flex-col lg:flex-row gap-1">
        {/* Sidebar - Hidden on mobile, shown on PC */}
        <div className="hidden lg:block">
          <ProgramsSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Full-width Hero Header Section */}
          <section className="w-full bg-vjn-blue py-16 md:py-20 mb-4 text-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-green-600">
                {t('programs.economic.title', 'Economic Empowerment Program')}
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-white">
                {t('programs.economic.subtitle', 'Building Sustainable Livelihoods')}
              </h2>
              <p className="text-lg md:text-xl max-w-2xl mx-auto text-white">
                {t('programs.economic.intro.description', 'Our Economic Empowerment Program is designed to equip youth with the skills and resources needed to achieve financial independence and entrepreneurial success. We focus on vocational training, business development, and market access.')}
              </p>
            </div>
          </section>

          {/* Download Brochure Button */}
          <div className="mb-4 flex justify-end">
            <a
              href="/downloads/brochures/economic_empowerment.pdf"
              download
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              <Download className="mr-2 w-4 h-4" />
              Download Brochure
            </a>
          </div>

          {/* Program Highlights Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2 mb-1">
            <h2 className="text-lg md:text-xl font-bold mb-1 flex items-center text-gray-900">
              <Award className="h-4 w-4 mr-1 text-green-600" />
              {t('programs.keyHighlights.title', 'Program Highlights')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              <div className="bg-white rounded-md p-2 text-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="text-green-600 mb-0.5 flex justify-center">
                  <Hammer className="h-5 w-5" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-0.5">1700+</div>
                <div className="text-gray-700 text-sm">Youth Trained</div>
              </div>
              <div className="bg-white rounded-md p-2 text-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="text-green-600 mb-0.5 flex justify-center">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-0.5">220+</div>
                <div className="text-gray-700 text-sm">GSLA Groups Formed</div>
              </div>
              <div className="bg-white rounded-md p-2 text-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="text-green-600 mb-0.5 flex justify-center">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-0.5">60+</div>
                <div className="text-gray-700 text-sm">Cooperatives Registered</div>
              </div>
              <div className="bg-white rounded-md p-2 text-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="text-green-600 mb-0.5 flex justify-center">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-0.5">80%+</div>
                <div className="text-gray-700 text-sm">Improved Livelihoods</div>
              </div>
              <div className="bg-white rounded-md p-2 text-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="text-green-600 mb-0.5 flex justify-center">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-0.5">100+</div>
                <div className="text-gray-700 text-sm">Mentorship Sessions</div>
              </div>
            </div>
          </section>

          {/* What We Offer Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2 mb-2">
            <div className="flex flex-col md:flex-row gap-2 items-start">
              <div className="md:w-1/3">
                <div className="bg-white p-2 rounded-sm shadow-xs border border-green-100">
                  <div className="text-green-600 mb-4">
                    <TrendingUp size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {t('programs.economic.title', 'Economic Empowerment Program')}
                  </h2>
                  <h3 className="text-lg font-semibold text-green-600 mb-3">
                    {t('programs.economic.subtitle', 'Building Sustainable Livelihoods')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {t('programs.economic.description', 'Our program addresses youth unemployment by providing comprehensive training, mentorship, and support services to help young people become self-employed or find meaningful employment.')}
                  </p>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <div className="bg-white rounded-sm shadow-xs p-2.5 border border-green-100">
                  <h4 className="text-base font-semibold text-gray-900 mb-2.5">
                    {t('programs.economic.details.title', 'Program Details')}
                  </h4>
                  <div className="space-y-1.5">
                    {economicDetails.map((detail, index) => (
                      <div key={index} className="flex items-start space-x-1.5 group">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                          <span className="text-green-600 font-semibold text-xs">{index + 1}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Objectives Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2.5 mb-2">
            <h2 className="text-xl font-bold mb-2.5 flex items-center text-gray-900">
              <Target className="h-4 w-4 mr-1 text-green-600" />
              {t('programs.economic.objectives.title', 'Program Objectives')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              {objectives.map((objective, index) => (
                <div key={index} className="flex items-start space-x-1.5 bg-white p-2.5 rounded-sm shadow-xs hover:shadow-sm transition-shadow border border-green-100 group">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                    <Award className="h-4 w-4 text-green-600 group-hover:text-white" />
                  </div>
                  <p className="text-gray-700 text-sm">{objective}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Target Groups Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2.5 mb-2">
            <h2 className="text-xl font-bold mb-2.5 flex items-center text-gray-900">
              <Users className="h-4 w-4 mr-1 text-green-600" />
              {t('programs.economic.targetGroups.title', 'Target Groups')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              <div className="bg-white rounded-sm shadow-xs p-2.5 border border-green-100">
                <h3 className="text-base font-semibold text-green-600 mb-2.5">{t('programs.economic.targetGroups.direct.title', 'Direct Beneficiaries')}</h3>
                <ul className="space-y-1.5">
                  {targetGroups.direct.map((group, index) => (
                    <li key={index} className="flex items-start space-x-1.5">
                      <Clock className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{group}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-sm shadow-xs p-2.5 border border-green-100">
                <h3 className="text-base font-semibold text-green-600 mb-2.5">{t('programs.economic.targetGroups.indirect.title', 'Indirect Beneficiaries')}</h3>
                <ul className="space-y-1.5">
                  {targetGroups.indirect.map((group, index) => (
                    <li key={index} className="flex items-start space-x-1.5">
                      <Clock className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{group}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Activities Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2.5 mb-2">
            <h2 className="text-xl font-bold mb-2.5 flex items-center text-gray-900">
              <Heart className="h-4 w-4 mr-1 text-green-600" />
              {t('programs.economic.activities.title', 'Key Activities')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              {activities.map((activity, index) => (
                <div key={index} className="bg-white rounded-sm shadow-xs p-2.5 hover:shadow-sm transition-all border border-green-100 group">
                  <div className="flex items-center space-x-1.5 mb-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                      <div className="text-green-600 group-hover:text-white">
                        {activity.icon}
                      </div>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">{activity.title}</h3>
                  </div>
                  <p className="text-gray-700 text-sm">{activity.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="mt-4 bg-gradient-to-r from-green-600 to-green-800 rounded-xl shadow-lg p-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-3 text-white">
                {t('programs.economic.cta.title', 'Get Involved')}
              </h2>
              <p className="text-green-100 text-base mb-4 max-w-2xl mx-auto">
                {t('programs.economic.cta.description', 'Join us in our mission to promote economic empowerment and sustainable livelihoods. Your support can make a difference.')}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link to="/volunteer">
                  <Button className="bg-white text-green-600 hover:bg-green-50">
                    {t('programs.economic.cta.volunteer', 'Volunteer With Us')}
                  </Button>
                </Link>
                <Link to="/donate">
                  <Button variant="outline" className="border-white text-white hover:bg-green-700">
                    {t('programs.economic.cta.donate', 'Support Our Programs')}
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Economic;
