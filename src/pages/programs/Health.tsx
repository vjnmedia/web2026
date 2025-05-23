import { Heart } from 'lucide-react';
import ProgramDetail from '@/components/ProgramDetail';
import { useLanguage } from '@/components/LanguageContext';

const Health = () => {
  const { t } = useLanguage();
  
  const healthDetails = [
    t('programs.health.detail1'),
    t('programs.health.detail2'),
    t('programs.health.detail3'),
    t('programs.health.detail4'),
    t('programs.health.detail5')
  ];

  return (
    <ProgramDetail
      id="health"
      title={t('programs.health')}
      subtitle={t('programs.health.subtitle')}
      description={t('programs.health.fullDesc')}
      details={healthDetails}
      icon={<Heart size={48} />}
      color="bg-red-50"
      iconColor="text-red-500"
      imageSrc="/images/programs/health/health.jpg"
    />
  );
};

export default Health;
