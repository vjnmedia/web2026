import { supabase } from '@/lib/supabase';

export interface DashboardStats {
  totalUsers: number;
  totalEvents: number;
  totalBlogs: number;
  totalProjects: number;
  totalStaff: number;
  totalPages: number;
  totalSliders: number;
  recentActivity: Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    time: string;
    status: string;
  }>;
}

export const dashboardService = {
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      // Fetch all statistics in parallel
      const [
        usersResult,
        eventsResult,
        staffResult,
        pagesResult,
        slidersResult
      ] = await Promise.all([
        // Count users from profiles table
        supabase
          .from('profiles')
          .select('id', { count: 'exact', head: true }),
        
        // Count events from events table
        supabase
          .from('events')
          .select('id', { count: 'exact', head: true }),
        
        // Count staff
        supabase
          .from('staff')
          .select('id', { count: 'exact', head: true }),
        
        // Count pages
        supabase
          .from('pages')
          .select('id', { count: 'exact', head: true }),
        
        // Count sliders
        supabase
          .from('slider')
          .select('id', { count: 'exact', head: true })
      ]);

      // Get recent activity from multiple tables
      const [recentPages, recentSliders, recentEvents] = await Promise.all([
        supabase
          .from('pages')
          .select('id, title, status, created_at')
          .order('created_at', { ascending: false })
          .limit(2),
        
        supabase
          .from('slider')
          .select('id, title, created_at')
          .order('created_at', { ascending: false })
          .limit(2),
        
        supabase
          .from('events')
          .select('id, title, status, created_at')
          .order('created_at', { ascending: false })
          .limit(2)
      ]);

      // Transform recent activity
      const recentActivity = [
        ...(recentPages.data || []).map(page => ({
          id: page.id,
          type: 'page',
          title: 'Page created',
          description: page.title,
          time: this.getTimeAgo(page.created_at),
          status: page.status
        })),
        ...(recentSliders.data || []).map(slider => ({
          id: slider.id,
          type: 'slider',
          title: 'Slider updated',
          description: slider.title,
          time: this.getTimeAgo(slider.created_at),
          status: 'active'
        })),
        ...(recentEvents.data || []).map(event => ({
          id: event.id,
          type: 'event',
          title: 'Event created',
          description: event.title,
          time: this.getTimeAgo(event.created_at),
          status: event.status
        }))
      ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 4);

      return {
        totalUsers: usersResult.count || 0,
        totalEvents: eventsResult.count || 0,
        totalBlogs: 0, // No blog table found, using 0
        totalProjects: 0, // No projects table found, using 0
        totalStaff: staffResult.count || 0,
        totalPages: pagesResult.count || 0,
        totalSliders: slidersResult.count || 0,
        recentActivity
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Return default stats if there's an error
      return {
        totalUsers: 0,
        totalEvents: 0,
        totalBlogs: 0,
        totalProjects: 0,
        totalStaff: 0,
        totalPages: 0,
        totalSliders: 0,
        recentActivity: []
      };
    }
  },

  getTimeAgo(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  }
};
