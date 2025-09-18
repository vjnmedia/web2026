import { Heart, Users, Target, Clock, Award, Globe, Shield, BookOpen, ChevronRight, CheckCircle2, Brain, Droplet, Download } from 'lucide-react';
import ProgramDetail from '@/components/ProgramDetail';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ProgramsSidebar from '@/components/ProgramsSidebar';

const Health = () => {
  const { t } = useLanguage();
  
  const healthDetails = [
    t('programs.health.details.background', 'The Health program was established by Vision Jeunesse Nouvelle in 2023. The idea to start this program came after identifying various health challenges faced by youth who lacked access to sufficient information and support services.'),
    t('programs.health.details.recreation', 'VJN also recognized that many youth participating in recreational activities could face accidents requiring basic first aid. Additionally, many sports activities at VJN require medical staff to treat athletes.'),
    t('programs.health.details.youngMothers', 'The program also addresses the needs of young mothers who lack sufficient knowledge about reproductive health and childcare. While various health services are provided to youth, additional services are needed to continue supporting youth health.'),
    t('programs.health.details.partners', 'VJN has helped youth access various health services through training funded by Imbuto Foundation in the Baho neza, Mountain Movers, and Door to Door Campaign projects. The organization also supports young mothers and their parents through savings and credit groups with MISEREOR and Imbuto Foundation.')
  ];

  const objectives = [
    t('programs.health.objectives.main', 'To improve the well-being of partners through various trainings, help them access sufficient health information, and provide various services to minimize the effects of poor health.'),
    t('programs.health.objectives.specific1', 'Provide training to enhance youth knowledge about health-related matters.'),
    t('programs.health.objectives.specific2', 'Help youth access basic health services and provide counseling to help them maintain good health.'),
    t('programs.health.objectives.specific3', 'Advocate for youth in various institutions.'),
    t('programs.health.objectives.specific4', 'Connect parents and children from families with conflicts related to young mothers.'),
    t('programs.health.objectives.specific5', 'Help youth reduce the effects of poor health.')
  ];

  const targetGroups = {
    direct: [
      t('programs.health.target.direct.youth', 'Youth'),
      t('programs.health.target.direct.adults', 'Adults'),
      t('programs.health.target.direct.disabled', 'People with disabilities')
    ],
    indirect: [
      t('programs.health.target.indirect.authorities', 'Government authorities'),
      t('programs.health.target.indirect.health', 'Health institutions'),
      t('programs.health.target.indirect.ngos', 'NGOs')
    ]
  };

  const services = [
    {
      title: t('programs.health.services.training.title', 'Training Programs'),
      items: [
        { name: 'PAC', duration: '3 days' },
        { name: 'Basic First Aid', duration: '15 days' },
        { name: 'Fight Against Abuse', duration: '3 days' },
        { name: 'Trauma Healing', duration: '9 days' },
        { name: 'Mental Health Training', duration: '9 days' },
        { name: 'Life Skills', duration: '9 days' },
        { name: 'Reproductive Health', duration: '3 days' },
        { name: 'Community Therapy', duration: '5 days' }
      ]
    },
    {
      title: t('programs.health.services.support.title', 'Support Services'),
      items: [
        { name: t('programs.health.services.support.mental', 'Mental Health Services for Young Mothers'), duration: 'Ongoing' },
        { name: t('programs.health.services.support.firstAid', 'Basic First Aid Services'), duration: 'Ongoing' },
        { name: t('programs.health.services.support.mobile', 'Mobile GBV Clinic Support'), duration: '1 day' },
        { name: t('programs.health.services.support.psychosocial', 'Psychosocial Support'), duration: 'Ongoing' }
      ]
    }
  ];

  const activities = [
    {
      icon: <BookOpen className="w-4 h-4" />,
      title: t('programs.health.activities.training', 'Health Education & Training'),
      description: t('programs.health.activities.trainingDesc', 'Workshops and seminars on reproductive health, mental health, and first aid for youth and community members.')
    },
    {
      icon: <Shield className="w-4 h-4" />,
      title: t('programs.health.activities.support', 'Support Services'),
      description: t('programs.health.activities.supportDesc', 'Provision of mental health support, psychosocial counseling, and mobile GBV clinic services.')
    },
    {
      icon: <Globe className="w-4 h-4" />,
      title: t('programs.health.activities.advocacy', 'Advocacy & Outreach'),
      description: t('programs.health.activities.advocacyDesc', 'Advocating for youth health rights and connecting families to health institutions and authorities.')
    },
    {
      icon: <Users className="w-4 h-4" />,
      title: t('programs.health.activities.community', 'Community Engagement'),
      description: t('programs.health.activities.communityDesc', 'Engaging youth and parents in savings groups, community therapy, and awareness campaigns.')
    }
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
                {t('programs.health.title', 'Health & Well-being Program')}
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-white">
                {t('programs.health.subtitle', 'Promoting Youth Well-being')}
              </h2>
              <p className="text-lg md:text-xl max-w-2xl mx-auto text-white">
                {t('programs.health.intro.description', 'Our Health Program is dedicated to promoting holistic well-being among youth and communities. We focus on preventive education, access to health services, and fostering healthy lifestyles to ensure a vibrant and resilient future.')}
              </p>
            </div>
          </section>

          {/* Download Brochure Button */}
          <div className="mb-4 flex justify-end">
            <a
              href="/downloads/brochures/Health.pdf"
              download
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              <Download className="mr-2 w-4 h-4" />
              Download Brochure
            </a>
          </div>

          {/* Program Highlights Section */}
          <section className="bg-gradient-to-br from-red-50 to-white rounded-md shadow-xs p-2 mb-1">
            <h2 className="text-lg md:text-xl font-bold mb-1 flex items-center text-gray-900">
              <Award className="h-4 w-4 mr-1 text-red-600" />
              {t('programs.keyHighlights.title', 'Program Highlights')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              <div className="bg-white rounded-md p-2 text-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="text-red-600 mb-0.5 flex justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-0.5">3000+</div>
                <div className="text-gray-700 text-sm">Beneficiaries</div>
              </div>
              <div className="bg-white rounded-md p-2 text-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="text-red-600 mb-0.5 flex justify-center">
                  <Heart className="h-5 w-5" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-0.5">5+</div>
                <div className="text-gray-700 text-sm">Health Initiatives</div>
              </div>
              <div className="bg-white rounded-md p-2 text-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="text-red-600 mb-0.5 flex justify-center">
                  <Award className="h-5 w-5" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-0.5">10+</div>
                <div className="text-gray-700 text-sm">Partners</div>
              </div>
              <div className="bg-white rounded-md p-2 text-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="text-red-600 mb-0.5 flex justify-center">
                  <Brain className="h-5 w-5" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-0.5">20+</div>
                <div className="text-gray-700 text-sm">Mental Wellness Workshops</div>
              </div>
              <div className="bg-white rounded-md p-2 text-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="text-red-600 mb-0.5 flex justify-center">
                  <Droplet className="h-5 w-5" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-0.5">2500+</div>
                <div className="text-gray-700 text-sm">Girls Reached on SRHR</div>
              </div>
            </div>
          </section>

          {/* What We Offer Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2 mb-2">
            <div className="flex flex-col md:flex-row gap-2 items-start">
              <div className="md:w-1/3">
                <div className="bg-white p-2 rounded-sm shadow-xs border border-green-100">
                  <div className="text-green-600 mb-1.5">
                    <Heart size={16} />
                  </div>
                  <h2 className="text-base font-bold text-gray-900 mb-0.5">
                    {t('programs.health.title', 'Health Program')}
                  </h2>
                  <h3 className="text-sm font-semibold text-green-600 mb-1">
                    {t('programs.health.subtitle', 'Promoting Youth Well-being')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-xs">
                    {t('programs.health.description', 'Our program addresses youth health challenges by providing comprehensive health education, access to basic health services, and support for young mothers. We work to ensure that young people have the knowledge and resources they need to maintain good health.')}
                  </p>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <div className="bg-white rounded-sm shadow-xs p-2.5 border border-red-100">
                  <h4 className="text-base font-semibold text-gray-900 mb-2.5">
                    {t('programs.health.details.title', 'Program Details')}
                  </h4>
                  <div className="space-y-1.5">
                    {healthDetails.map((detail, index) => (
                      <div key={index} className="flex items-start space-x-1.5 group">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                          <span className="text-red-600 font-semibold text-xs">{index + 1}</span>
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
              {t('programs.health.objectives.title', 'Program Objectives')}
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
              {t('programs.health.targetGroups.title', 'Target Groups')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              {(targetGroups.direct.concat(targetGroups.indirect)).map((group, index) => (
                <div key={index} className="flex items-start space-x-1.5 bg-white p-2.5 rounded-sm shadow-xs hover:shadow-sm transition-shadow border border-green-100 group">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                    <Clock className="h-4 w-4 text-green-600 group-hover:text-white" />
                  </div>
                  <p className="text-gray-700 text-sm">{group}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Activities Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2.5 mb-2">
            <h2 className="text-xl font-bold mb-2.5 flex items-center text-gray-900">
              <Heart className="h-4 w-4 mr-1 text-green-600" />
              {t('programs.health.activities.title', 'Key Activities')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              {activities.map((activity, index) => (
                <div key={index} className="bg-white rounded-sm shadow-xs p-2.5 hover:shadow-sm transition-all border border-green-100 group">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                      <div className="text-green-600 group-hover:text-white text-xs">
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
          <section className="mt-4 bg-gradient-to-r from-red-600 to-red-800 rounded-xl shadow-lg p-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-3 text-white">
                {t('programs.health.cta.title', 'Get Involved')}
              </h2>
              <p className="text-red-100 text-base mb-4 max-w-2xl mx-auto">
                {t('programs.health.cta.description', 'Join us in our mission to improve health and well-being in communities. Your support can make a difference.')}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link to="/volunteer">
                  <Button className="bg-white text-red-600 hover:bg-red-50">
                    {t('programs.health.cta.volunteer', 'Volunteer With Us')}
                  </Button>
                </Link>
                <Link to="/donate">
                  <Button variant="outline" className="border-white text-white hover:bg-red-700">
                    {t('programs.health.cta.donate', 'Support Our Programs')}
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

export default Health;
