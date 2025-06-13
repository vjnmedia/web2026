import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import ApplicationForm from '@/components/career/ApplicationForm';
import { 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Globe, 
  Users, 
  Clock, 
  ChevronDown,
  Send
} from 'lucide-react';

interface JobPosition {
  id: number;
  title: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Volunteer';
  location: string;
  department: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

const Career = () => {
  const { t } = useLanguage();
  const [selectedPosition, setSelectedPosition] = useState<JobPosition | null>(null);
  const [showApplication, setShowApplication] = useState(false);

  const jobPositions: JobPosition[] = [
    {
      id: 1,
      title: 'Youth Program Coordinator',
      type: 'Full-time',
      location: 'Rubavu, Rwanda',
      department: 'Programs',
      description: 'Lead and coordinate youth development programs, ensuring effective implementation and impact measurement.',
      requirements: [
        'Bachelor\'s degree in Social Work, Education, or related field',
        'Minimum 3 years experience in youth program management',
        'Excellent communication and leadership skills',
        'Fluency in English, French, and Kinyarwanda',
        'Experience in monitoring and evaluation'
      ],
      responsibilities: [
        'Design and implement youth development programs',
        'Manage program budgets and resources',
        'Build partnerships with local organizations',
        'Monitor program outcomes and impact',
        'Mentor and train program staff'
      ]
    },
    {
      id: 2,
      title: 'Community Outreach Officer',
      type: 'Full-time',
      location: 'Gisenyi, Rwanda',
      department: 'Community Engagement',
      description: 'Develop and maintain strong relationships with community stakeholders to promote VJN programs and initiatives.',
      requirements: [
        'Bachelor\'s degree in Community Development or related field',
        '2+ years experience in community outreach',
        'Strong interpersonal and networking skills',
        'Knowledge of local community dynamics',
        'Proficiency in local languages'
      ],
      responsibilities: [
        'Conduct community needs assessments',
        'Organize community engagement events',
        'Facilitate community dialogues',
        'Develop outreach materials',
        'Report on community feedback and impact'
      ]
    },
    {
      id: 3,
      title: 'Peace Building Facilitator',
      type: 'Contract',
      location: 'Various Locations',
      department: 'Peace Building',
      description: 'Lead peace-building workshops and facilitate dialogue sessions among youth and community members.',
      requirements: [
        'Experience in conflict resolution and mediation',
        'Strong facilitation skills',
        'Understanding of peace-building principles',
        'Ability to work in diverse communities',
        'Experience in youth engagement'
      ],
      responsibilities: [
        'Facilitate peace-building workshops',
        'Develop training materials',
        'Monitor and evaluate program impact',
        'Write progress reports',
        'Coordinate with program partners'
      ]
    }
  ];

  const benefits = [
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: t('career.benefits.health.title', 'Health & Wellness'),
      description: t('career.benefits.health.description', 'Comprehensive health coverage and wellness programs for you and your family.')
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-blue-500" />,
      title: t('career.benefits.learning.title', 'Professional Development'),
      description: t('career.benefits.learning.description', 'Continuous learning opportunities through workshops, training, and education support.')
    },
    {
      icon: <Globe className="h-6 w-6 text-green-500" />,
      title: t('career.benefits.impact.title', 'Global Impact'),
      description: t('career.benefits.impact.description', 'Be part of meaningful initiatives that create positive change in communities.')
    },
    {
      icon: <Users className="h-6 w-6 text-purple-500" />,
      title: t('career.benefits.culture.title', 'Inclusive Culture'),
      description: t('career.benefits.culture.description', 'Work in a diverse, supportive environment that values every team member\'s contribution.')
    }
  ];

  const handleApply = () => {
    setShowApplication(true);
  };

  const handleCloseApplication = () => {
    setShowApplication(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-vjn-blue text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-600">
              {t('career.hero.title', 'Join Our Mission')}
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              {t('career.hero.subtitle', 'Build your career while making a difference in the lives of young people')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Current Openings */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('career.openings.title', 'Current Opportunities')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobPositions.map((position) => (
            <motion.div
              key={position.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
                    <p className="text-gray-600 mb-4">{position.department}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    position.type === 'Full-time' ? 'bg-green-100 text-green-800' :
                    position.type === 'Part-time' ? 'bg-blue-100 text-blue-800' :
                    position.type === 'Contract' ? 'bg-orange-100 text-orange-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {position.type}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 text-sm mt-4">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{position.location}</span>
                </div>
                <p className="mt-4 text-gray-700">{position.description}</p>
                <Button
                  onClick={() => setSelectedPosition(position)}
                  className="w-full mt-6"
                  variant="outline"
                >
                  {t('career.openings.viewDetails', 'View Details')}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('career.benefits.title', 'Why Work With Us')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-block p-3 rounded-full bg-gray-100 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Process */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('career.process.title', 'Application Process')}
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {[
              {
                step: '01',
                title: t('career.process.step1.title', 'Submit Application'),
                description: t('career.process.step1.description', 'Fill out the online application form and upload your CV and cover letter.')
              },
              {
                step: '02',
                title: t('career.process.step2.title', 'Initial Review'),
                description: t('career.process.step2.description', 'Our team will review your application and assess your qualifications.')
              },
              {
                step: '03',
                title: t('career.process.step3.title', 'Interview Process'),
                description: t('career.process.step3.description', 'Selected candidates will be invited for interviews and assessments.')
              },
              {
                step: '04',
                title: t('career.process.step4.title', 'Final Decision'),
                description: t('career.process.step4.description', 'Successful candidates will receive an offer letter and onboarding information.')
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-vjn-blue text-white flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            {t('career.contact.title', 'Have Questions?')}
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('career.contact.description', 'Contact our HR team for any questions about our current opportunities or application process.')}
          </p>
          <Button className="inline-flex items-center">
            <Send className="mr-2 h-4 w-4" />
            {t('career.contact.button', 'Contact HR Team')}
          </Button>
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedPosition && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedPosition.title}</h2>
                  <p className="text-gray-600">{selectedPosition.department} · {selectedPosition.location}</p>
                </div>
                <button
                  onClick={() => setSelectedPosition(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-gray-700">{selectedPosition.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {selectedPosition.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {selectedPosition.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t">
                  <Button 
                    className="w-full"
                    onClick={handleApply}
                  >
                    {t('career.openings.apply', 'Apply Now')}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Application Form Modal */}
      {showApplication && selectedPosition && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <ApplicationForm
              jobId={selectedPosition.id}
              jobTitle={selectedPosition.title}
              onClose={handleCloseApplication}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Career; 