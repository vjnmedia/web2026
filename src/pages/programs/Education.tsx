import { GraduationCap, BookOpen, Users, Target, Clock, Award, Calendar, MapPin, Building2, Globe, Shield, ChevronRight, CheckCircle2, Briefcase } from 'lucide-react';
import ProgramDetail from '@/components/ProgramDetail';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ProgramsSidebar from '@/components/ProgramsSidebar';

const Education = () => {
  const { t } = useLanguage();
  
  const educationDetails = [
    t('programs.education.details.history', 'The Education & Vocational Training program was established by Vision Jeunesse Nouvelle in 2005. It began as a response to the critical need for accessible education and skill development among Rwandan youth, especially those affected by the 1994 Genocide against the Tutsi.'),
    t('programs.education.details.initialFocus', 'Initially, the program focused on providing basic literacy and numeracy skills to out-of-school youth and adults. Over time, it expanded to include vocational training in various trades such as tailoring, carpentry, and hairdressing, responding to market demands.'),
    t('programs.education.details.partnerships', 'VJN has partnered with several organizations, including UNICEF, USAID, and the Rwandan Ministry of Education, to enhance the quality and reach of its educational initiatives. These partnerships have enabled the program to provide scholarships, educational materials, and modern training facilities.'),
    t('programs.education.details.impact', 'The program has successfully empowered thousands of youth, enabling them to secure employment, start their own businesses, and contribute to the economic development of their communities. It has also fostered a culture of continuous learning and innovation among participants.')
  ];

  const objectives = [
    t('programs.education.objectives.main', 'To provide quality education and vocational training that equips youth with essential skills for employment and entrepreneurship.'),
    t('programs.education.objectives.specific1', 'Enhance literacy and numeracy skills among out-of-school youth and adults.'),
    t('programs.education.objectives.specific2', 'Provide market-driven vocational training to improve employability and self-employment opportunities.'),
    t('programs.education.objectives.specific3', 'Foster critical thinking, creativity, and problem-solving skills through innovative learning methods.'),
    t('programs.education.objectives.specific4', 'Promote gender equality and inclusivity in education, ensuring equal opportunities for all.')
  ];

  const selectionCriteria = [
    {
      title: t('programs.education.criteria.vocational.title', 'Vocational Training Center'),
      criteria: [
        t('programs.education.criteria.vocational.age', 'Age: 16 years or above'),
        t('programs.education.criteria.vocational.education', 'Completed Primary School (P6) or above'),
        t('programs.education.criteria.vocational.literacy', 'Basic literacy skills'),
        t('programs.education.criteria.vocational.priority', 'Vulnerable youth prioritized'),
        t('programs.education.criteria.vocational.gender', 'Open to both genders')
      ]
    },
    {
      title: t('programs.education.criteria.instructor.title', 'Literacy Instructors'),
      criteria: [
        t('programs.education.criteria.instructor.residency', 'Residency in the literacy zone'),
        t('programs.education.criteria.instructor.age', 'Age: 21-50 years'),
        t('programs.education.criteria.instructor.education', 'A\' Level minimum'),
        t('programs.education.criteria.instructor.writing', 'Proficiency in writing'),
        t('programs.education.criteria.instructor.volunteer', 'Willingness to volunteer'),
        t('programs.education.criteria.instructor.languages', 'Basic English and French skills')
      ]
    },
    {
      title: t('programs.education.criteria.choir.title', 'Intama za Yezu Choir'),
      criteria: [
        t('programs.education.criteria.choir.age', 'Youth age range'),
        t('programs.education.criteria.choir.passion', 'Passion for music'),
        t('programs.education.criteria.choir.commitment', 'Commitment to regular rehearsals'),
        t('programs.education.criteria.choir.skills', 'Basic vocal skills'),
        t('programs.education.criteria.choir.faith', 'Catholic faith'),
        t('programs.education.criteria.choir.parish', 'Parish affiliation')
      ]
    }
  ];

  const impactStats = [
    { icon: <Users className="h-5 w-5 text-blue-600" />, value: '1000+', label: t('programs.education.impact.students', 'Students Trained') },
    { icon: <BookOpen className="h-5 w-5 text-blue-600" />, value: '15+', label: t('programs.education.impact.courses', 'Courses Offered') },
    { icon: <Briefcase className="h-5 w-5 text-blue-600" />, value: '80%', label: t('programs.education.impact.employment', 'Employment Rate') }
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
          {/* Hero Section */}
          <section className="relative mb-2 rounded-md overflow-hidden h-64 lg:h-80">
            <img
              src="/images/programs/education/IMG_9525.JPG"
              alt="Education Program"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-900/70 z-10" />
            <div className="relative z-20 p-4 text-white">
              <div className="max-w-3xl">
                <div className="inline-block p-1 bg-blue-600/30 rounded-full mb-2">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h1 className="text-3xl font-bold mb-3">
                  {t('programs.education.title', 'Education & Vocational Training Program')}
                </h1>
                <p className="text-base mb-4 text-blue-100 leading-relaxed">
                  {t('programs.education.intro.description', 'Our Education Program is dedicated to empowering youth and communities through comprehensive learning opportunities. We combine traditional education with practical vocational training to create pathways for sustainable development and employment.')}
                </p>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Users className="h-3.5 w-3.5" />
                    <div>
                      <div className="text-base font-bold">1000+</div>
                      <div className="text-xs text-blue-100">Students</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Building2 className="h-3.5 w-3.5" />
                    <div>
                      <div className="text-base font-bold">6</div>
                      <div className="text-xs text-blue-100">Programs</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">
                    <MapPin className="h-3.5 w-3.5" />
                    <div>
                      <div className="text-base font-bold">15+</div>
                      <div className="text-xs text-blue-100">Locations</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What We Offer Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2 mb-2">
            <div className="flex flex-col md:flex-row gap-2 items-start">
              <div className="md:w-1/3">
                <div className="bg-white p-2 rounded-sm shadow-xs border border-blue-100">
                  <div className="text-blue-600 mb-2">
                    <GraduationCap size={24} />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    {t('programs.education.title', 'Education & Vocational Training Program')}
                  </h2>
                  <h3 className="text-sm font-semibold text-blue-600 mb-1.5">
                    {t('programs.education.subtitle', 'Empowering Through Education')}
                  </h3>
                  <p className="text-gray-700 text-xs">
                    {t('programs.education.description', 'Our education program provides comprehensive learning opportunities, from vocational training to literacy programs, ensuring inclusive and quality education for all.')}
                  </p>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <div className="bg-white rounded-sm shadow-xs p-2.5 border border-blue-100">
                  <h4 className="text-base font-semibold text-gray-900 mb-2.5">
                    {t('programs.education.details.title', 'Program Details')}
                  </h4>
                  <div className="space-y-1.5">
                    {educationDetails.map((detail, index) => (
                      <div key={index} className="flex items-start space-x-1.5 group">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <span className="text-blue-600 text-xs font-semibold">{index + 1}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Impact Stats Section */}
          <section className="bg-gradient-to-br from-blue-50 to-white rounded-md shadow-xs p-2.5 mb-2">
            <h2 className="text-xl font-bold mb-2.5 flex items-center text-gray-900">
              <Target className="h-4 w-4 mr-1 text-blue-600" />
              {t('programs.education.impact', 'Our Impact')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5">
              {impactStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-md p-2 text-center shadow-xs hover:shadow-sm transition-shadow">
                  <div className="text-blue-600 mb-1 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-lg font-bold text-gray-900 mb-0.5">{stat.value}</div>
                  <div className="text-gray-700 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Objectives Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2.5 mb-2">
            <h2 className="text-xl font-bold mb-2.5 flex items-center text-gray-900">
              <Target className="h-4 w-4 mr-1 text-blue-600" />
              {t('programs.education.objectives.title', 'Program Objectives')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              {objectives.map((objective, index) => (
                <div key={index} className="flex items-start space-x-1.5 bg-white p-2.5 rounded-sm shadow-xs hover:shadow-sm transition-shadow">
                  <Award className="h-3.5 w-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">{objective}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Target Groups Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2.5 mb-2">
            <h2 className="text-xl font-bold mb-2.5 flex items-center text-gray-900">
              <Target className="h-4 w-4 mr-1 text-blue-600" />
              {t('programs.education.targetGroups.title', 'Target Groups')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              <div className="flex items-start space-x-1.5 bg-white p-2.5 rounded-sm shadow-xs hover:shadow-sm transition-shadow">
                <CheckCircle2 className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700 text-sm">{t('programs.education.targetGroups.vocational', 'Vocational Training')}</p>
              </div>
              <div className="flex items-start space-x-1.5 bg-white p-2.5 rounded-sm shadow-xs hover:shadow-sm transition-shadow">
                <CheckCircle2 className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700 text-sm">{t('programs.education.targetGroups.literacy', 'Literacy & Numeracy')}</p>
              </div>
              <div className="flex items-start space-x-1.5 bg-white p-2.5 rounded-sm shadow-xs hover:shadow-sm transition-shadow">
                <CheckCircle2 className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700 text-sm">{t('programs.education.targetGroups.gold', 'Gold Youth')}</p>
              </div>
              <div className="flex items-start space-x-1.5 bg-white p-2.5 rounded-sm shadow-xs hover:shadow-sm transition-shadow">
                <CheckCircle2 className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700 text-sm">{t('programs.education.targetGroups.library', 'Library')}</p>
              </div>
              <div className="flex items-start space-x-1.5 bg-white p-2.5 rounded-sm shadow-xs hover:shadow-sm transition-shadow">
                <CheckCircle2 className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700 text-sm">{t('programs.education.targetGroups.pwd', 'PWD Program')}</p>
              </div>
            </div>
          </section>

          {/* Selection Criteria Section */}
          <section className="mt-4 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-4">
            <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-900">
              <Users className="h-6 w-6 mr-2 text-blue-600" />
              {t('programs.education.criteria.title', 'Selection Criteria')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {selectionCriteria.map((category, index) => (
                <div key={index} className="bg-white rounded-xl p-3.5 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold mb-2.5 text-blue-600">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.criteria.map((criterion, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <Clock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Problem Statement Section */}
          <section className="mt-4 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-4">
            <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-900">
              <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
              {t('programs.education.context.title', 'Context & Challenges')}
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 text-sm mb-2.5">
                {t('programs.education.context.paragraph1', 'In Rwanda, the education sector faces critical barriers to providing quality, equitable learning opportunities. According to UNESCO\'s "Institute for Statistics 2022" report, Rwanda has 1,967,627 individuals who are illiterate, with females accounting for 1,164,074 of these totals. Local authorities report that the Rubavu District alone has approximately 47,000 illiterate residents spanning various age groups.')}
              </p>
              <p className="text-gray-700 text-sm">
                {t('programs.education.context.paragraph2', 'These challenges are compounded by limited infrastructure, lack of trained teachers, and cultural or social barriers, which further hinder educational progress. Additionally, economic constraints and displacement prevent families from prioritizing education, leading to high dropout rates, illiteracy, and a lack of vocational skills among young people.')}
              </p>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="mt-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-3 text-white">
                {t('programs.education.cta.title', 'Get Involved')}
              </h2>
              <p className="text-blue-100 text-base mb-4 max-w-2xl mx-auto">
                {t('programs.education.cta.description', 'Join us in our mission to provide quality education and vocational training to youth in Rwanda. Your support can make a difference.')}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link to="/volunteer">
                  <Button className="bg-white text-blue-600 hover:bg-blue-50">
                    {t('programs.education.cta.volunteer', 'Volunteer With Us')}
                  </Button>
                </Link>
                <Link to="/donate">
                  <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                    {t('programs.education.cta.donate', 'Support Our Programs')}
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

export default Education;
