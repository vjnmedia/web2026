import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Download, BookOpen, Megaphone, FileSpreadsheet, Image, File } from 'lucide-react';

interface ResourceItem {
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  downloadUrl: string;
  icon: React.ReactNode;
}

const Resources: React.FC = () => {
  const { t } = useTranslation();

  const publications: ResourceItem[] = [
    {
      title: "Annual Report 2023",
      description: "Comprehensive overview of VJN's activities and achievements in 2023",
      fileType: "PDF",
      fileSize: "2.4 MB",
      downloadUrl: "#",
      icon: <File className="h-6 w-6 text-red-500" />
    },
    {
      title: "Youth Development Strategy",
      description: "Our strategic approach to youth empowerment and development",
      fileType: "PDF",
      fileSize: "1.8 MB",
      downloadUrl: "#",
      icon: <File className="h-6 w-6 text-red-500" />
    },
    {
      title: "Research on Youth Employment",
      description: "Study on youth employment trends and opportunities in Rwanda",
      fileType: "PDF",
      fileSize: "3.2 MB",
      downloadUrl: "#",
      icon: <File className="h-6 w-6 text-red-500" />
    }
  ];

  const announcements: ResourceItem[] = [
    {
      title: "Upcoming Training Programs",
      description: "Schedule of upcoming youth training programs and workshops",
      fileType: "DOCX",
      fileSize: "156 KB",
      downloadUrl: "#",
      icon: <FileText className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Community Events Calendar",
      description: "Calendar of community events and activities",
      fileType: "XLSX",
      fileSize: "98 KB",
      downloadUrl: "#",
      icon: <FileSpreadsheet className="h-6 w-6 text-green-500" />
    }
  ];

  const documents: ResourceItem[] = [
    {
      title: "Volunteer Application Form",
      description: "Application form for volunteering opportunities",
      fileType: "DOCX",
      fileSize: "45 KB",
      downloadUrl: "#",
      icon: <FileText className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Project Proposal Template",
      description: "Template for submitting project proposals",
      fileType: "DOCX",
      fileSize: "78 KB",
      downloadUrl: "#",
      icon: <FileText className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Program Guidelines",
      description: "Guidelines for participating in VJN programs",
      fileType: "PDF",
      fileSize: "1.2 MB",
      downloadUrl: "#",
      icon: <File className="h-6 w-6 text-red-500" />
    }
  ];

  const media: ResourceItem[] = [
    {
      title: "Photo Gallery 2023",
      description: "Collection of photos from our events and activities",
      fileType: "ZIP",
      fileSize: "45 MB",
      downloadUrl: "#",
      icon: <Image className="h-6 w-6 text-purple-500" />
    },
    {
      title: "VJN Brand Guidelines",
      description: "Brand assets and usage guidelines",
      fileType: "PDF",
      fileSize: "4.5 MB",
      downloadUrl: "#",
      icon: <File className="h-6 w-6 text-red-500" />
    }
  ];

  const ResourceSection = ({ title, items }: { title: string; items: ResourceItem[] }) => (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        {title === 'Publications' && <BookOpen className="h-6 w-6 mr-2 text-vjn-blue" />}
        {title === 'Announcements' && <Megaphone className="h-6 w-6 mr-2 text-vjn-blue" />}
        {title === 'Documents' && <FileText className="h-6 w-6 mr-2 text-vjn-blue" />}
        {title === 'Media' && <Image className="h-6 w-6 mr-2 text-vjn-blue" />}
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {item.icon}
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <span>{item.fileType}</span>
                <span>•</span>
                <span>{item.fileSize}</span>
              </div>
              <a
                href={item.downloadUrl}
                className="flex items-center text-vjn-blue hover:text-vjn-light-blue transition-colors"
              >
                <Download className="h-4 w-4 mr-1" />
                {t('resources.download', 'Download')}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{t('resources.title', 'Resources')}</h1>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('resources.search.title', 'Search Resources')}</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder={t('resources.search.placeholder', 'Search for resources...')}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vjn-blue"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vjn-blue">
              <option value="">{t('resources.search.allTypes', 'All Types')}</option>
              <option value="pdf">PDF</option>
              <option value="doc">DOC</option>
              <option value="xls">XLS</option>
              <option value="image">Images</option>
            </select>
          </div>
        </div>

        <ResourceSection title={t('resources.sections.publications', 'Publications')} items={publications} />
        <ResourceSection title={t('resources.sections.announcements', 'Announcements')} items={announcements} />
        <ResourceSection title={t('resources.sections.documents', 'Documents')} items={documents} />
        <ResourceSection title={t('resources.sections.media', 'Media')} items={media} />
      </div>
    </div>
  );
};

export default Resources; 