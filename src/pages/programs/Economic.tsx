
import { Users } from 'lucide-react';
import ProgramDetail from '@/components/ProgramDetail';
import { useLanguage } from '@/components/LanguageContext';

const Economic = () => {
  const { t } = useLanguage();
  
  const economicDetails = [
    t('programs.economic.detail1'),
    t('programs.economic.detail2'),
    t('programs.economic.detail3'),
    t('programs.economic.detail4'),
    t('programs.economic.detail5')
  ];

  return (
    <ProgramDetail
      id="economic"
      title={t('programs.economic')}
      subtitle={t('programs.economic.subtitle')}
      description={t('programs.economic.fullDesc')}
      details={economicDetails}
      icon={<Users size={48} />}
      color="bg-green-50"
      iconColor="text-green-500"
      imageSrc="https://images.unsplash.com/photo-1538935732373-f7a495fea3f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    />
  );
};

export default Economic;
