import { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import ProjectsManagement from '@/components/dashboard/ProjectsManagement';
import YouthTalentsManagement from '@/components/dashboard/YouthTalentsManagement';
import TeamsManagement from '@/components/dashboard/TeamsManagement';
import ModernBlogManagement from '@/components/dashboard/ModernBlogManagement';
import SocialMediaManagement from '@/components/dashboard/SocialMediaManagement';
import ModernEventsManagement from '@/components/dashboard/ModernEventsManagement';
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
  Briefcase,
  BarChart3,
  TrendingUp,
  Activity,
  Bell,
  Search,
  Menu,
  X,
  Home,
  LogOut,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data for dashboard overview
  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalEvents: 23,
    totalBlogs: 156,
    totalProjects: 8
  });

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Home, color: 'text-blue-600' },
    { id: 'profile', label: 'Profile', icon: User, color: 'text-green-600' },
    { id: 'blog', label: 'Blog Management', icon: Pencil, color: 'text-purple-600' },
    { id: 'events', label: 'Events', icon: Calendar, color: 'text-orange-600' },
    { id: 'projects', label: 'Projects', icon: FileText, color: 'text-indigo-600' },
    { id: 'staff', label: 'Staff', icon: Briefcase, color: 'text-pink-600' },
    { id: 'social', label: 'Social Media', icon: Share2, color: 'text-cyan-600' },
    { id: 'admin', label: 'Admin Settings', icon: Settings, color: 'text-gray-600' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'profile':
        return <UserProfile />;
      case 'blog':
        return <ModernBlogManagement />;
      case 'events':
        return <ModernEventsManagement />;
      case 'projects':
        return <ProjectsManagement />;
      case 'staff':
        return <StaffManagement />;
      case 'social':
        return <SocialMediaManagement />;
      case 'admin':
        return <AdminSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  // Listen for navigation events from quick actions
  useEffect(() => {
    const handleNavigation = (event: CustomEvent) => {
      const tab = event.detail;
      if (navigationItems.find(item => item.id === tab)) {
        setActiveTab(tab);
      }
    };

    window.addEventListener('dashboard-navigate', handleNavigation as EventListener);
    return () => {
      window.removeEventListener('dashboard-navigate', handleNavigation as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:flex-shrink-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-vjn-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VJN</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Admin Panel</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>
                  {user?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || 'Admin User'}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {user?.email || 'admin@vjn.org'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1">
            <nav className="p-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      activeTab === item.id
                        ? "bg-vjn-blue text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <Icon className={cn("mr-3 h-5 w-5", activeTab === item.id ? "text-white" : item.color)} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:bg-gray-100"
              onClick={logout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {navigationItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                </h2>
                <p className="text-sm text-gray-500">
                  Manage your organization's content and settings
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="sm">
                <Search className="h-5 w-5" />
              </Button>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.role || 'Administrator'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
      
      <Toaster position="top-right" />
    </div>
  );
};

export default Dashboard;
