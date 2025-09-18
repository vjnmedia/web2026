import { supabase } from '@/lib/supabase';

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  status: 'Upcoming' | 'Past' | 'Draft' | 'Archived';
  featured: boolean;
  imageUrl?: string;
  slug: string;
  participants?: number;
  tags: string[];
  ctaText?: string;
  ctaLink?: string;
  rsvpLink?: string;
  googleCalendarLink?: string;
  createdAt: string;
  updatedAt: string;
}

const eventColumns = 'id,title,description,date,time,location,category,status,featured,imageUrl,slug,participants,tags,ctaText,ctaLink,rsvpLink,googleCalendarLink,created_at,updated_at';

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://your-project.supabase.co' && supabaseAnonKey !== 'your-anon-key';
};

// Mock events for fallback when Supabase is not configured
const mockEvents: Event[] = [
  {
    id: 1,
    title: 'Youth Leadership Summit',
    description: 'A summit bringing together young leaders from across Rwanda to discuss leadership, innovation, and community impact.',
    date: '2024-08-15',
    time: '09:00 AM',
    location: 'Kigali Convention Center',
    category: 'Leadership',
    status: 'Upcoming',
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    slug: 'youth-leadership-summit',
    participants: 200,
    tags: ['leadership', 'youth', 'summit'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    title: 'Peace Building Workshop',
    description: 'Interactive workshop focused on peace-building skills and conflict resolution for youth.',
    date: '2024-07-20',
    time: '02:00 PM',
    location: 'VJN Headquarters',
    category: 'Peacebuilding',
    status: 'Upcoming',
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    slug: 'peace-building-workshop',
    participants: 50,
    tags: ['peace', 'workshop', 'conflict-resolution'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 3,
    title: 'Community Health Drive',
    description: 'A health outreach event providing free checkups and health education to the community.',
    date: '2024-06-10',
    time: '10:00 AM',
    location: 'Nyamirambo Center',
    category: 'Health',
    status: 'Past',
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?auto=format&fit=crop&w=600&q=80',
    slug: 'community-health-drive',
    participants: 120,
    tags: ['health', 'community', 'outreach'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 4,
    title: 'Sports Tournament Finals',
    description: 'Finals of the annual youth sports tournament featuring football, basketball, and volleyball.',
    date: '2024-09-05',
    time: '03:00 PM',
    location: 'Amahoro Stadium',
    category: 'Sports',
    status: 'Upcoming',
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80',
    slug: 'sports-tournament-finals',
    participants: 350,
    tags: ['sports', 'tournament', 'youth'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export const eventService = {
  // Get all events
  getAllEvents: async (): Promise<Event[]> => {
    if (!isSupabaseConfigured()) {
      console.warn('Using mock events data - Supabase not configured');
      return mockEvents;
    }

    try {
      const { data, error } = await supabase
        .from('events')
        .select(eventColumns)
        .order('featured', { ascending: false })
        .order('date', { ascending: true });
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching events from Supabase:', error);
      console.warn('Falling back to mock events data');
      return mockEvents;
    }
  },

  // Get upcoming events with automatic status filtering
  getUpcomingEvents: async (): Promise<Event[]> => {
    if (!isSupabaseConfigured()) {
      console.warn('Using mock upcoming events data - Supabase not configured');
      return mockEvents.filter(event => event.status === 'Upcoming');
    }

    try {
      // First, update any outdated events
      await eventService.updateOutdatedEvents();
      
      const { data, error } = await supabase
        .from('events')
        .select(eventColumns)
        .eq('status', 'Upcoming')
        .order('featured', { ascending: false })
        .order('date', { ascending: true });
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching upcoming events from Supabase:', error);
      console.warn('Falling back to mock upcoming events data');
      return mockEvents.filter(event => event.status === 'Upcoming');
    }
  },

  // Update outdated events status
  updateOutdatedEvents: async (): Promise<void> => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - skipping status update');
      return;
    }

    try {
      const now = new Date().toISOString();
      
      // Update events that are past their date/time
      const { error } = await supabase
        .from('events')
        .update({ status: 'Past' })
        .eq('status', 'Upcoming')
        .lt('date', now.split('T')[0]); // Events before today
      
      if (error) {
        console.error('Error updating outdated events:', error);
      } else {
        console.log('Successfully updated outdated events status');
      }
    } catch (error) {
      console.error('Error in updateOutdatedEvents:', error);
    }
  },

  // Get past events
  getPastEvents: async (): Promise<Event[]> => {
    if (!isSupabaseConfigured()) {
      console.warn('Using mock past events data - Supabase not configured');
      return mockEvents.filter(event => event.status === 'Past');
    }

    try {
      const { data, error } = await supabase
        .from('events')
        .select(eventColumns)
        .eq('status', 'Past')
        .order('date', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching past events from Supabase:', error);
      console.warn('Falling back to mock past events data');
      return mockEvents.filter(event => event.status === 'Past');
    }
  },

  // Get events by category
  getEventsByCategory: async (category: string): Promise<Event[]> => {
    if (!isSupabaseConfigured()) {
      console.warn('Using mock events data by category - Supabase not configured');
      return mockEvents.filter(event => event.category === category);
    }

    try {
      const { data, error } = await supabase
        .from('events')
        .select(eventColumns)
        .eq('category', category)
        .order('date', { ascending: true });
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching events by category from Supabase:', error);
      console.warn('Falling back to mock events data by category');
      return mockEvents.filter(event => event.category === category);
    }
  },

  // Get single event by id
  getEvent: async (id: number): Promise<Event | null> => {
    if (!isSupabaseConfigured()) {
      console.warn('Using mock event data - Supabase not configured');
      return mockEvents.find(event => event.id === id) || null;
    }

    try {
      const { data, error } = await supabase
        .from('events')
        .select(eventColumns)
        .eq('id', id)
        .single();
      if (error) throw error;
      return data || null;
    } catch (error) {
      console.error('Error fetching event by id from Supabase:', error);
      console.warn('Falling back to mock event data');
      return mockEvents.find(event => event.id === id) || null;
    }
  },

  // Get event by slug
  getEventBySlug: async (slug: string): Promise<Event | null> => {
    if (!isSupabaseConfigured()) {
      console.warn('Using mock event data by slug - Supabase not configured');
      return mockEvents.find(event => event.slug === slug) || null;
    }

    try {
      const { data, error } = await supabase
        .from('events')
        .select(eventColumns)
        .eq('slug', slug)
        .single();
      if (error) throw error;
      return data || null;
    } catch (error) {
      console.error('Error fetching event by slug from Supabase:', error);
      console.warn('Falling back to mock event data by slug');
      return mockEvents.find(event => event.slug === slug) || null;
    }
  },

  // Create new event
  createEvent: async (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> => {
    if (!isSupabaseConfigured()) {
      console.warn('Cannot create events - Supabase not configured');
      // Return a mock event for development
      const mockEvent: Event = {
        id: Date.now(),
        ...event,
        slug: event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        tags: event.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return mockEvent;
    }

    // Generate slug from title
    const slug = event.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const now = new Date().toISOString();
    // Ensure tags is a string
    const tags = Array.isArray(event.tags) ? JSON.stringify(event.tags) : (event.tags || '[]');
    // Build the payload
    const payload: any = {
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
      status: event.status,
      featured: event.featured,
      imageUrl: event.imageUrl || null,
      slug,
      participants: event.participants ?? null,
      tags,
      ctaText: event.ctaText || null,
      ctaLink: event.ctaLink || null,
      rsvpLink: event.rsvpLink || null,
      googleCalendarLink: event.googleCalendarLink || null,
      created_at: now,
      updated_at: now,
    };
    // Remove undefined fields
    Object.keys(payload).forEach(
      (key) => payload[key] === undefined && delete payload[key]
    );
    // Log for debugging
    console.log('Creating event with payload:', payload);
    const { data, error } = await supabase
      .from('events')
      .insert([payload])
      .select(eventColumns)
      .single();
    if (error) throw error;
    return data;
  },

  // Update event
  updateEvent: async (id: number, event: Partial<Event>): Promise<Event> => {
    if (!isSupabaseConfigured()) {
      console.warn('Cannot update events - Supabase not configured');
      // Return a mock updated event for development
      const mockEvent: Event = {
        id,
        title: event.title || 'Updated Event',
        description: event.description || '',
        date: event.date || '',
        time: event.time || '',
        location: event.location || '',
        category: event.category || '',
        status: event.status || 'Upcoming',
        featured: event.featured || false,
        imageUrl: event.imageUrl || '',
        slug: event.title ? event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '',
        participants: event.participants || 0,
        tags: event.tags || [],
        ctaText: event.ctaText || '',
        ctaLink: event.ctaLink || '',
        rsvpLink: event.rsvpLink || '',
        googleCalendarLink: event.googleCalendarLink || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return mockEvent;
    }

    if (event.title) {
      event.slug = event.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    event.updated_at = new Date().toISOString();
    // Ensure tags is a string
    if (event.tags && Array.isArray(event.tags)) {
      event.tags = JSON.stringify(event.tags);
    }
    // Remove undefined fields
    Object.keys(event).forEach(
      (key) => event[key as keyof typeof event] === undefined && delete event[key as keyof typeof event]
    );
    // Log the payload for debugging
    console.log('Updating event with payload:', event);
    const { data, error } = await supabase
      .from('events')
      .update(event)
      .eq('id', id)
      .select(eventColumns)
      .single();
    if (error) throw error;
    return data;
  },

  // Delete event
  deleteEvent: async (id: number): Promise<void> => {
    if (!isSupabaseConfigured()) {
      console.warn('Cannot delete events - Supabase not configured');
      // Mock successful deletion for development
      return;
    }

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  // Upload event image to Supabase Storage
  uploadImage: async (file: File): Promise<{ imageUrl: string }> => {
    if (!isSupabaseConfigured()) {
      console.warn('Cannot upload images - Supabase not configured');
      throw new Error('Supabase is not configured. Please check your environment variables.');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `event-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Try uploading to 'events' bucket
    const { data, error } = await supabase.storage.from('events').upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      console.error('Supabase image upload error:', error);
      if (error.message && error.message.includes('bucket')) {
        throw new Error('Supabase Storage bucket "events" does not exist. Please create it in your Supabase dashboard.');
      }
      throw new Error('Failed to upload image. Please try again.');
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage.from('events').getPublicUrl(filePath);
    if (!publicUrlData?.publicUrl) {
      throw new Error('Failed to get public URL for uploaded image.');
    }
    return { imageUrl: publicUrlData.publicUrl };
  },
}; 