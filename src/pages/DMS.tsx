import { useLanguage } from '@/components/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/hooks/useProjects';
import { Loader2, ExternalLink } from 'lucide-react';

const DMS = () => {
  const { t } = useLanguage();
  const { projects, loading, error } = useProjects();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-vjn-blue" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">{t('dms.title', 'Data Management Systems')}</h1>

      <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-200">{t('dms.projectsTitle', 'Our Projects')}</h2>
      
      {projects.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          {t('dms.noProjects', 'No projects available at the moment.')}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="p-6 flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              {project.imageUrl && (
                <img src={project.imageUrl} alt={project.name} className="w-full h-48 object-cover rounded-md mb-4" />
              )}
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{project.name}</h2>
              {project.description && <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">{project.description}</p>}
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.status === 'Active' ? 'bg-green-100 text-green-800' :
                  project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {project.status}
                </span>
                <span className="ml-auto">{t('dms.startDate', 'Start:')} {project.startDate}</span>
              </div>
              {project.externalLink ? (
                <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className="mt-auto">
                  <Button className="w-full bg-vjn-blue hover:bg-vjn-blue-dark">
                    {t('dms.viewProject', 'View Project')} <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              ) : (
                <Button className="w-full bg-gray-300 text-gray-700 cursor-not-allowed" disabled>
                  {t('dms.noExternalLink', 'No external link')}
                </Button>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DMS; 