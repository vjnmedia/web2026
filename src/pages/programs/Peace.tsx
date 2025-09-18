import { Heart, Users, Target, Clock, Award, Globe, Shield, BookOpen, ChevronRight, Handshake, Film, Tent, Mic, Radio, Download } from 'lucide-react';
import ProgramDetail from '@/components/ProgramDetail';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ProgramsSidebar from '@/components/ProgramsSidebar';

const Peace = () => {
  const { t } = useLanguage();
  
  const peaceDetails = [
    t('programs.peace.details.history', 'The Peace Building program was established by Vision Jeunesse Nouvelle in 2012, recognizing the persistent conflicts in the Great Lakes region and the need for youth empowerment to foster peace. Initially, efforts focused on resolving family conflicts and addressing trauma among youth in the Western Province.'),
    t('programs.peace.details.expansion', 'Over time, the program expanded to include training in peace education, conflict resolution, and leadership skills. VJN has partnered with various organizations, including AEGIS TRUST, NEVER AGAIN RWANDA, and HROC (Healing and Rebuilding Our Communities), to implement its peace initiatives.'),
    t('programs.peace.details.impact', 'The program has successfully trained over 1,000 young people and community leaders in peace building techniques, enabling them to mediate conflicts and promote reconciliation in their communities.')
  ];

  const objectives = [
    t('programs.peace.objectives.main', 'To empower youth with conflict resolution skills and promote a culture of peace in the Great Lakes region.'),
    t('programs.peace.objectives.specific1', 'Equip youth with knowledge and skills to resolve conflicts peacefully.'),
    t('programs.peace.objectives.specific2', 'Promote reconciliation and social cohesion among communities.'),
    t('programs.peace.objectives.specific3', 'Advocate for youth participation in peace-building processes.'),
    t('programs.peace.objectives.specific4', 'Provide psychosocial support to victims of conflict and trauma.')
  ];

  const targetGroups = {
    direct: [
      t('programs.peace.target.direct.youth', 'Youth (15-30 years)'),
      t('programs.peace.target.direct.leaders', 'Community Leaders'),
      t('programs.peace.target.direct.families', 'Families affected by conflict')
    ],
    indirect: [
      t('programs.peace.target.indirect.localAuthorities', 'Local Government Authorities'),
      t('programs.peace.target.indirect.schools', 'Schools and Educational Institutions'),
      t('programs.peace.target.indirect.religious', 'Religious Institutions'),
      t('programs.peace.target.indirect.csos', 'Civil Society Organizations')
    ]
  };

  const selectionCriteria = [
    t('programs.peace.criteria.age', 'Age: 15-30 years'),
    t('programs.peace.criteria.commitment', 'Commitment to peace-building'),
    t('programs.peace.criteria.leadership', 'Leadership potential'),
    t('programs.peace.criteria.community', 'Actively involved in community activities'),
    t('programs.peace.criteria.willingness', 'Willingness to learn and share knowledge')
  ];

  const approaches = [
    {
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      title: t('programs.peace.approaches.education.title', 'Peace Education and Training'),
      description: t('programs.peace.approaches.education.description', 'Conducting workshops and seminars on conflict resolution, mediation, and non-violent communication.')
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: t('programs.peace.approaches.dialogue.title', 'Dialogue and Reconciliation'),
      description: t('programs.peace.approaches.dialogue.description', 'Facilitating community dialogues and reconciliation forums to address past grievances and build trust.')
    },
    {
      icon: <Award className="h-6 w-6 text-blue-600" />,
      title: t('programs.peace.approaches.capacity.title', 'Capacity Building'),
      description: t('programs.peace.approaches.capacity.description', 'Training community leaders and youth in peace-building methodologies and leadership.')
    },
    {
      icon: <Heart className="h-6 w-6 text-blue-600" />,
      title: t('programs.peace.approaches.psychosocial.title', 'Psychosocial Support'),
      description: t('programs.peace.approaches.psychosocial.description', 'Providing counseling and trauma healing sessions to individuals and families affected by conflict.')
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
                {t('programs.peace.title', 'Peace Building Program')}
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-white">
                {t('programs.peace.subtitle', 'Building Peace Through Youth Empowerment')}
              </h2>
              <p className="text-lg md:text-xl max-w-2xl mx-auto text-white">
                {t('programs.peace.intro.description', 'Our Peace Building Program is dedicated to fostering social cohesion and reconciliation among youth. We promote dialogue, conflict resolution, and inter-community understanding to build a more peaceful and inclusive society.')}
              </p>
            </div>
          </section>

          {/* Download Brochure Button */}
          <div className="mb-4 flex justify-end">
            <a
              href="/downloads/brochures/peacebuilding.pdf"
              download
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              <Download className="mr-2 w-4 h-4" />
              Download Brochure
            </a>
          </div>

          {/* Program Highlights Section */}
          <section className="bg-gradient-to-br from-blue-50 to-white rounded-md shadow-xs p-2 mb-1">
            <h2 className="text-lg md:text-xl font-bold mb-1 flex items-center text-gray-900">
              <Award className="h-4 w-4 mr-1 text-blue-600" />
              {t('programs.keyHighlights.title', 'Program Highlights')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              <div className="bg-white rounded-md p-2 text-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="text-blue-600 mb-0.5 flex justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-0.5">6000+</div>
                <div className="text-gray-700 text-sm">Youth Reached</div>
              </div>
              <div className="bg-white rounded-md p-2 text-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="text-blue-600 mb-0.5 flex justify-center">
                  <Film className="h-5 w-5" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-0.5">120+</div>
                <div className="text-gray-700 text-sm">Films Screened</div>
              </div>
              <div className="bg-white rounded-md p-2 text-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="text-blue-600 mb-0.5 flex justify-center">
                  <Tent className="h-5 w-5" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-0.5">14+</div>
                <div className="text-gray-700 text-sm">Peace Camps Held</div>
              </div>
              <div className="bg-white rounded-md p-2 text-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="text-blue-600 mb-0.5 flex justify-center">
                  <Mic className="h-5 w-5" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-0.5">500+</div>
                <div className="text-gray-700 text-sm">Trained Peace Leaders</div>
              </div>
              <div className="bg-white rounded-md p-2 text-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="text-blue-600 mb-0.5 flex justify-center">
                  <Radio className="h-5 w-5" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-0.5">5+</div>
                <div className="text-gray-700 text-sm">Peace Radio Programs</div>
              </div>
            </div>
          </section>

          {/* What We Offer Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2 mb-2">
            <div className="flex flex-col md:flex-row gap-2 items-start">
              <div className="md:w-1/3">
                <div className="bg-white p-2 rounded-sm shadow-xs border border-purple-100">
                  <div className="text-blue-600 mb-4">
                    <Heart size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {t('programs.peace.title', 'Peace Building Program')}
                  </h2>
                  <h3 className="text-lg font-semibold text-blue-600 mb-3">
                    {t('programs.peace.subtitle', 'Building Peace Through Youth Empowerment')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {t('programs.peace.description', 'Our program addresses the root causes of conflict by equipping youth with tools for conflict resolution and promoting a culture of peace in Rwanda and the Great Lakes region.')}
                  </p>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <div className="bg-white rounded-sm shadow-xs p-2.5 border border-red-100">
                  <h4 className="text-base font-semibold text-gray-900 mb-2.5">
                    {t('programs.peace.details.title', 'Program Details')}
                  </h4>
                  <div className="space-y-1.5">
                    {peaceDetails.map((detail, index) => (
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
              <Target className="h-4 w-4 mr-1 text-red-600" />
              {t('programs.peace.objectives.title', 'Program Objectives')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              {objectives.map((objective, index) => (
                <div key={index} className="flex items-start space-x-1.5 bg-white p-2.5 rounded-sm shadow-xs hover:shadow-sm transition-shadow border border-red-100 group">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                    <Award className="h-4 w-4 text-red-600 group-hover:text-white" />
                  </div>
                  <p className="text-gray-700 text-sm">{objective}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Target Groups Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2.5 mb-2">
            <h2 className="text-xl font-bold mb-2.5 flex items-center text-gray-900">
              <Users className="h-4 w-4 mr-1 text-red-600" />
              {t('programs.peace.targetGroups.title', 'Target Groups')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              {/* Direct Target Groups */}
              {targetGroups.direct.map((group, index) => (
                <div key={`direct-${index}`} className="flex items-start space-x-1.5 bg-white p-2.5 rounded-sm shadow-xs hover:shadow-sm transition-shadow border border-red-100 group">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                    <Clock className="h-4 w-4 text-red-600 group-hover:text-white" />
                  </div>
                  <p className="text-gray-700 text-sm">{group}</p>
                </div>
              ))}
              {/* Indirect Target Groups */}
              {targetGroups.indirect.map((group, index) => (
                <div key={`indirect-${index}`} className="flex items-start space-x-1.5 bg-white p-2.5 rounded-sm shadow-xs hover:shadow-sm transition-shadow border border-red-100 group">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                    <Clock className="h-4 w-4 text-red-600 group-hover:text-white" />
                  </div>
                  <p className="text-gray-700 text-sm">{group}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Selection Criteria Section */}
          <section className="mt-8 bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-lg p-4">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
              <Shield className="h-6 w-6 mr-2 text-blue-600" />
              {t('programs.peace.criteria.title', 'Selection Criteria')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectionCriteria.map((criterion, index) => (
                <div key={index} className="flex items-start space-x-3 bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all border border-blue-100 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <Award className="h-5 w-5 text-blue-600 group-hover:text-white" />
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">{criterion}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Approaches Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2 mb-2">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
              <Shield className="h-6 w-6 mr-2 text-blue-600" />
              {t('programs.peace.approaches.title', 'Our Approaches')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {approaches.map((approach, index) => (
                <div key={index} className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-all border border-blue-100 group">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <div className="text-blue-600 group-hover:text-white text-sm">
                        {approach.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{approach.title}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">{approach.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="mt-4 bg-gradient-to-r from-red-600 to-red-800 rounded-xl shadow-lg p-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-3 text-white">
                {t('programs.peace.cta.title', 'Get Involved')}
              </h2>
              <p className="text-red-100 text-base mb-4 max-w-2xl mx-auto">
                {t('programs.peace.cta.description', 'Join us in our mission to promote peace and social cohesion in communities. Your support can make a difference.')}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link to="/volunteer">
                  <Button className="bg-white text-red-600 hover:bg-red-50">
                    {t('programs.peace.cta.volunteer', 'Volunteer With Us')}
                  </Button>
                </Link>
                <Link to="/donate">
                  <Button variant="outline" className="border-white text-white hover:bg-red-700">
                    {t('programs.peace.cta.donate', 'Support Our Programs')}
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

export default Peace;
