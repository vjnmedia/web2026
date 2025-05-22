import { useLanguage } from '@/components/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Define a simple interface for external systems
interface ExternalSystem {
  name: string;
  url: string;
  description?: string;
}

const DMS = () => {
  const { t } = useLanguage();

  // Placeholder data for external systems
  const externalSystems: ExternalSystem[] = [
    {
      name: 'Project System 1',
      url: '#', // Replace with actual URL
      description: 'Description for Project System 1',
    },
    {
      name: 'Project System 2',
      url: '#', // Replace with actual URL
      description: 'Description for Project System 2',
    },
    {
      name: 'Project System 3',
      url: '#', // Replace with actual URL
      description: 'Description for Project System 3',
    },
    {
      name: 'Project System 4',
      url: '#', // Replace with actual URL
      description: 'Description for Project System 4',
    },
    {
      name: 'Project System 5',
      url: '#', // Replace with actual URL
      description: 'Description for Project System 5',
    },
    // Add more systems as needed
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">{t('Data Management Systems')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {externalSystems.map((system, index) => (
          <Card key={index} className="p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-2">{system.name}</h2>
            {system.description && <p className="text-gray-600 mb-4">{system.description}</p>}
            <a href={system.url} target="_blank" rel="noopener noreferrer" className="mt-auto">
              <Button className="w-full">Access System</Button>
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DMS; 