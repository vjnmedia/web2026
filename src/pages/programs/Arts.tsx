import { Music } from 'lucide-react';
import ProgramDetail from '@/components/ProgramDetail';
import { useLanguage } from '@/components/LanguageContext';

const Arts = () => {
  const { t } = useLanguage();
  
  const artsDetails = [
    t('programs.arts.detail1'),
    t('programs.arts.detail2'),
    t('programs.arts.detail3'),
    t('programs.arts.detail4'),
    t('programs.arts.detail5')
  ];

  return (
    <ProgramDetail
      id="arts"
      title={t('programs.arts')}
      subtitle={t('programs.arts.subtitle')}
      description={t('programs.arts.fullDesc')}
      details={artsDetails}
      icon={<Music size={48} />}
      color="bg-purple-50"
      iconColor="text-purple-500"
      imageSrc="/images/programs/culture/arts.jpg"
    />
  );
};

export default Arts;
