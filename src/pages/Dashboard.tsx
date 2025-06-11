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
import AdminSettings from '@/components/dashboard/AdminSettings';
import UserProfile from '@/components/dashboard/UserProfile';
import StaffManagement from '@/components/dashboard/StaffManagement';
import { 
  FileText, 
  Users, 
  User, 
  Pencil, 
  Share2, 
  Calendar, 
  MapPin,
  Settings,
  Briefcase
} from 'lucide-react';
import { Toaster } from 'sonner';

const Dashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');

  const tabIcons = {
    profile: <User className="mr-2 h-4 w-4" />,
    projects: <FileText className="mr-2 h-4 w-4" />,
    youth: <Users className="mr-2 h-4 w-4" />,
    teams: <Users className="mr-2 h-4 w-4" />,
    blog: <Pencil className="mr-2 h-4 w-4" />,
    social: <Share2 className="mr-2 h-4 w-4" />,
    events: <Calendar className="mr-2 h-4 w-4" />,
    locations: <MapPin className="mr-2 h-4 w-4" />,
    staff: <Briefcase className="mr-2 h-4 w-4" />,
    admin: <Settings className="mr-2 h-4 w-4" />
  };

  return (
    <div className="container mx-auto py-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex gap-6">
          {/* Vertical Navigation */}
          <div className="w-64 flex-shrink-0">
            <TabsList className="flex flex-col h-auto w-full space-y-2 bg-transparent">
              <TabsTrigger 
                value="profile" 
                className="flex items-center justify-start w-full px-4 py-3 data-[state=active]:bg-vjn-blue data-[state=active]:text-white"
              >
                {tabIcons.profile}
                {t('dashboard.profile')}
              </TabsTrigger>
              <TabsTrigger 
                value="projects" 
                className="flex items-center justify-start w-full px-4 py-3 data-[state=active]:bg-vjn-blue data-[state=active]:text-white"
              >
                {tabIcons.projects}
                {t('dashboard.projects')}
              </TabsTrigger>
              <TabsTrigger 
                value="youth" 
                className="flex items-center justify-start w-full px-4 py-3 data-[state=active]:bg-vjn-blue data-[state=active]:text-white"
              >
                {tabIcons.youth}
                {t('dashboard.youth')}
              </TabsTrigger>
              <TabsTrigger 
                value="teams" 
                className="flex items-center justify-start w-full px-4 py-3 data-[state=active]:bg-vjn-blue data-[state=active]:text-white"
              >
                {tabIcons.teams}
                {t('dashboard.teams')}
              </TabsTrigger>
              <TabsTrigger 
                value="blog" 
                className="flex items-center justify-start w-full px-4 py-3 data-[state=active]:bg-vjn-blue data-[state=active]:text-white"
              >
                {tabIcons.blog}
                {t('dashboard.blog')}
              </TabsTrigger>
              <TabsTrigger 
                value="social" 
                className="flex items-center justify-start w-full px-4 py-3 data-[state=active]:bg-vjn-blue data-[state=active]:text-white"
              >
                {tabIcons.social}
                {t('dashboard.social')}
              </TabsTrigger>
              <TabsTrigger 
                value="events" 
                className="flex items-center justify-start w-full px-4 py-3 data-[state=active]:bg-vjn-blue data-[state=active]:text-white"
              >
                {tabIcons.events}
                {t('dashboard.events')}
              </TabsTrigger>
              <TabsTrigger 
                value="locations" 
                className="flex items-center justify-start w-full px-4 py-3 data-[state=active]:bg-vjn-blue data-[state=active]:text-white"
              >
                {tabIcons.locations}
                {t('dashboard.locations')}
              </TabsTrigger>
              <TabsTrigger 
                value="staff" 
                className="flex items-center justify-start w-full px-4 py-3 data-[state=active]:bg-vjn-blue data-[state=active]:text-white"
              >
                {tabIcons.staff}
                {t('dashboard.staff.title', 'Staff Management')}
              </TabsTrigger>
              <TabsTrigger 
                value="admin" 
                className="flex items-center justify-start w-full px-4 py-3 data-[state=active]:bg-vjn-blue data-[state=active]:text-white"
              >
                {tabIcons.admin}
                {t('dashboard.adminSettings.title')}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <TabsContent value="profile" className="mt-0">
              <UserProfile />
            </TabsContent>

            <TabsContent value="projects" className="mt-0">
              <ProjectsManagement />
            </TabsContent>
            
            <TabsContent value="youth" className="mt-0">
              <YouthTalentsManagement />
            </TabsContent>
            
            <TabsContent value="teams" className="mt-0">
              <TeamsManagement />
            </TabsContent>
            
            <TabsContent value="blog" className="mt-0">
              <BlogManagement />
            </TabsContent>
            
            <TabsContent value="social" className="mt-0">
              <SocialMediaManagement />
            </TabsContent>
            
            <TabsContent value="events" className="mt-0">
              <EventsManagement />
            </TabsContent>
            
            <TabsContent value="locations" className="mt-0">
              <LocationsManagement />
            </TabsContent>

            <TabsContent value="staff" className="mt-0">
              <StaffManagement />
            </TabsContent>
            
            <TabsContent value="admin" className="mt-0">
              <AdminSettings />
            </TabsContent>
          </div>
        </div>
      </Tabs>
      
      <Toaster position="top-right" />
    </div>
  );
};

export default Dashboard;
