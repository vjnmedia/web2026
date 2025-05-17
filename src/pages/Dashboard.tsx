
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from '@/components/LanguageContext';
import ProjectsManagement from '@/components/dashboard/ProjectsManagement';
import YouthTalentsManagement from '@/components/dashboard/YouthTalentsManagement';
import TeamsManagement from '@/components/dashboard/TeamsManagement';
import BlogManagement from '@/components/dashboard/BlogManagement';
import SocialMediaManagement from '@/components/dashboard/SocialMediaManagement';
import EventsManagement from '@/components/dashboard/EventsManagement';
import LocationsManagement from '@/components/dashboard/LocationsManagement';
import { 
  FileText, 
  Users, 
  User, 
  Pencil, 
  Share2, 
  Calendar, 
  MapPin 
} from 'lucide-react';
import { Toaster } from 'sonner';

const Dashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("projects");

  const tabIcons = {
    projects: <FileText className="mr-2 h-4 w-4" />,
    youth: <User className="mr-2 h-4 w-4" />,
    teams: <Users className="mr-2 h-4 w-4" />,
    blog: <Pencil className="mr-2 h-4 w-4" />,
    social: <Share2 className="mr-2 h-4 w-4" />,
    events: <Calendar className="mr-2 h-4 w-4" />,
    locations: <MapPin className="mr-2 h-4 w-4" />,
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6 text-vjn-blue">{t('dashboard.title')}</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 flex flex-wrap gap-2">
          <TabsTrigger value="projects" className="flex items-center">
            {tabIcons.projects}
            {t('dashboard.projects')}
          </TabsTrigger>
          <TabsTrigger value="youth" className="flex items-center">
            {tabIcons.youth}
            {t('dashboard.youth')}
          </TabsTrigger>
          <TabsTrigger value="teams" className="flex items-center">
            {tabIcons.teams}
            {t('dashboard.teams')}
          </TabsTrigger>
          <TabsTrigger value="blog" className="flex items-center">
            {tabIcons.blog}
            {t('dashboard.blog')}
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center">
            {tabIcons.social}
            {t('dashboard.social')}
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center">
            {tabIcons.events}
            {t('dashboard.events')}
          </TabsTrigger>
          <TabsTrigger value="locations" className="flex items-center">
            {tabIcons.locations}
            {t('dashboard.locations')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="pt-4">
          <ProjectsManagement />
        </TabsContent>
        
        <TabsContent value="youth" className="pt-4">
          <YouthTalentsManagement />
        </TabsContent>
        
        <TabsContent value="teams" className="pt-4">
          <TeamsManagement />
        </TabsContent>
        
        <TabsContent value="blog" className="pt-4">
          <BlogManagement />
        </TabsContent>
        
        <TabsContent value="social" className="pt-4">
          <SocialMediaManagement />
        </TabsContent>
        
        <TabsContent value="events" className="pt-4">
          <EventsManagement />
        </TabsContent>
        
        <TabsContent value="locations" className="pt-4">
          <LocationsManagement />
        </TabsContent>
      </Tabs>
      
      <Toaster position="top-right" />
    </div>
  );
};

export default Dashboard;
