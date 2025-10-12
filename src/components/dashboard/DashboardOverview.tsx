import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Users, 
  Calendar, 
  FileText, 
  Briefcase, 
  TrendingUp, 
  Activity,
  Eye,
  Edit,
  Plus,
  ArrowRight,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { dashboardService, DashboardStats } from '@/services/dashboardService';

interface DashboardOverviewProps {
  // Remove the stats prop since we'll fetch it internally
}

const DashboardOverview: React.FC<DashboardOverviewProps> = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalEvents: 0,
    totalBlogs: 0,
    totalProjects: 0,
    totalStaff: 0,
    totalPages: 0,
    totalSliders: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const dashboardStats = await dashboardService.getDashboardStats();
        setStats(dashboardStats);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        toast.error('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickActions = [
    {
      title: 'Create Blog Post',
      description: 'Write and publish a new article',
      icon: FileText,
      color: 'bg-purple-500',
      action: () => {
        window.dispatchEvent(new CustomEvent('dashboard-navigate', { detail: 'blog' }));
      }
    },
    {
      title: 'Add Event',
      description: 'Schedule a new event',
      icon: Calendar,
      color: 'bg-orange-500',
      action: () => {
        window.dispatchEvent(new CustomEvent('dashboard-navigate', { detail: 'events' }));
      }
    },
    {
      title: 'Manage Staff',
      description: 'Update team information',
      icon: Users,
      color: 'bg-blue-500',
      action: () => {
        window.dispatchEvent(new CustomEvent('dashboard-navigate', { detail: 'staff' }));
      }
    },
    {
      title: 'View Analytics',
      description: 'Check platform statistics',
      icon: BarChart3,
      color: 'bg-green-500',
      action: () => {
        toast.info('Analytics feature coming soon!');
      }
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'blog':
        return <FileText className="h-4 w-4 text-purple-600" />;
      case 'event':
        return <Calendar className="h-4 w-4 text-orange-600" />;
      case 'user':
        return <Users className="h-4 w-4 text-blue-600" />;
      case 'project':
        return <Briefcase className="h-4 w-4 text-green-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="default" className="bg-green-100 text-green-800">Published</Badge>;
      case 'upcoming':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Upcoming</Badge>;
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case 'in-progress':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-vjn-blue to-vjn-green rounded-xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-3">Welcome to VJN Dashboard</h1>
            <p className="text-white/90 text-lg max-w-2xl">
              Manage your organization's content, events, and community engagement from one central location.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-4xl">🎯</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : stats.totalUsers.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Active profiles
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Staff Members</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : stats.totalStaff}
                </p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Team members
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pages</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : stats.totalPages}
                </p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <FileText className="h-3 w-3 mr-1" />
                  Content pages
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Events</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : stats.totalEvents}
                </p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Total events
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto p-4 hover:bg-gray-50"
                  onClick={action.action}
                >
                  <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mr-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-gray-900">{action.title}</div>
                    <div className="text-sm text-gray-500">{action.description}</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Recent Activity</CardTitle>
            <CardDescription>Latest updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                <span className="ml-2 text-gray-500">Loading recent activity...</span>
              </div>
            ) : stats.recentActivity.length > 0 ? (
              <div className="space-y-4">
                {stats.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-900">{activity.title}</p>
                        <div className="flex items-center space-x-3">
                          {getStatusBadge(activity.status)}
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {activity.time}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No recent activity to display</p>
              </div>
            )}
            <div className="mt-6 pt-4 border-t">
              <Button variant="outline" className="w-full">
                View All Activity
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">System Status</CardTitle>
          <CardDescription>Current system health and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4 p-4 rounded-xl bg-green-50 border border-green-200">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-green-900">Database</p>
                <p className="text-xs text-green-700">All systems operational</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-xl bg-green-50 border border-green-200">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-green-900">API Services</p>
                <p className="text-xs text-green-700">Response time: 120ms</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-xl bg-yellow-50 border border-yellow-200">
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-yellow-900">Storage</p>
                <p className="text-xs text-yellow-700">75% capacity used</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
