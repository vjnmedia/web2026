
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
      imageSrc="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    />
  );
};

export default Health;
