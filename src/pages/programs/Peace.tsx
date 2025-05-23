import { Smile } from 'lucide-react';
import ProgramDetail from '@/components/ProgramDetail';
import { useLanguage } from '@/components/LanguageContext';

const Peace = () => {
  const { t } = useLanguage();
  
  const peaceDetails = [
    t('programs.peace.detail1'),
    t('programs.peace.detail2'),
    t('programs.peace.detail3'),
    t('programs.peace.detail4'),
    t('programs.peace.detail5')
  ];

  return (
    <ProgramDetail
      id="peace"
      title={t('programs.peace.title')}
      subtitle={t('programs.peace.subtitle')}
      description={t('programs.peace.fullDesc')}
      details={peaceDetails}
      icon={<Smile size={48} />}
      color="bg-yellow-50"
      iconColor="text-yellow-600"
      imageSrc="/images/programs/peace/peace.jpg"
    />
  );
};

export default Peace;
