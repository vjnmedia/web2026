
import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageContext';
import { Link } from 'react-router-dom';

interface ProgramCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color?: string;
}

const ProgramCard = ({ id, title, description, icon, color = 'bg-white' }: ProgramCardProps) => {
  const { t } = useLanguage();
  
  return (
    <div className={`${color} rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300`}>
      <div className="p-6">
        <div className="mb-4 text-vjn-blue">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-vjn-blue">{title}</h3>
        <p className="mb-4 text-vjn-dark-gray">{description}</p>
        <Link to={`/programs/${id}`}>
          <Button variant="outline" className="border-vjn-blue text-vjn-blue hover:bg-vjn-blue hover:text-white">
            {t('programs.learnMore')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProgramCard;
