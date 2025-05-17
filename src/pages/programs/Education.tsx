
import { Book } from 'lucide-react';
import ProgramDetail from '@/components/ProgramDetail';
import { useLanguage } from '@/components/LanguageContext';

const Education = () => {
  const { t } = useLanguage();
  
  const educationDetails = [
    t('programs.education.detail1'),
    t('programs.education.detail2'),
    t('programs.education.detail3'),
    t('programs.education.detail4'),
    t('programs.education.detail5')
  ];

  return (
    <ProgramDetail
      id="education"
      title={t('programs.education')}
      subtitle={t('programs.education.subtitle')}
      description={t('programs.education.fullDesc')}
      details={educationDetails}
      icon={<Book size={48} />}
      color="bg-blue-50"
      iconColor="text-blue-500"
      imageSrc="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    />
  );
};

export default Education;
