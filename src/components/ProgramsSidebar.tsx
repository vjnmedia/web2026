import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { cn } from '@/lib/utils';
import { 
  Heart, 
  BookOpen, 
  Briefcase, 
  Globe, 
  Users, 
  Trophy 
} from 'lucide-react';

const ProgramsSidebar = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const programs = [
    {
      path: '/programs/health',
      icon: Heart,
      title: t('programs.health.title', 'Health Program')
    },
    {
      path: '/programs/education',
      icon: BookOpen,
      title: t('programs.education.title', 'Education Program')
    },
    {
      path: '/programs/economic',
      icon: Briefcase,
      title: t('programs.economic.title', 'Economic Program')
    },
    {
      path: '/programs/peace',
      icon: Globe,
      title: t('programs.peace.title', 'Peace Program')
    },
    {
      path: '/programs/sport-culture-arts',
      icon: Trophy,
      title: t('programs.sportCultureArts.title', 'Sport, Culture & Arts Program')
    }
  ];

  return (
    <div className="w-56 bg-white rounded-lg shadow-sm border border-gray-100 p-2">
      <h3 className="text-base font-semibold text-gray-900 mb-2 px-2">
        {t('programs.sidebar.title', 'Our Programs')}
      </h3>
      <nav className="space-y-0.5">
        {programs.map((program) => {
          const Icon = program.icon;
          const isActive = location.pathname === program.path;
          
          return (
            <Link
              key={program.path}
              to={program.path}
              className={cn(
                "flex items-center space-x-2 px-2 py-1.5 rounded-md transition-colors",
                isActive 
                  ? "bg-green-50 text-green-700" 
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <Icon className={cn(
                "h-4 w-4",
                isActive ? "text-green-600" : "text-gray-500"
              )} />
              <span className="text-sm font-medium">{program.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default ProgramsSidebar; 