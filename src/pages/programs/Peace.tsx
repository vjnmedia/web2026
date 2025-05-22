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
      imageSrc="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    />
  );
};

export default Peace;
