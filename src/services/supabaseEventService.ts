import { supabase } from '@/lib/supabase';
import { Event } from '@/services/eventService';
import { Database } from '@/integrations/supabase/types';

// Type for Supabase events table row
type SupabaseEventRow = Database['public']['Tables']['events']['Row'];
type SupabaseEventInsert = Database['public']['Tables']['events']['Insert'];
type SupabaseEventUpdate = Database['public']['Tables']['events']['Update'];

// Helper function to determine event status based on date
const getEventStatus = (date: string, time: string): 'Upcoming' | 'Past' => {
  const eventDateTime = new Date(`${date}T${time}`);
  const now = new Date();
  return eventDateTime >= now ? 'Upcoming' : 'Past';
};

// Transform Supabase data to Event format
function transformSupabaseToEvent(supabaseEvent: SupabaseEventRow): Event {
  return {
    id: supabaseEvent.id, // Use numeric ID directly
    title: supabaseEvent.title,
    description: supabaseEvent.description,
    date: supabaseEvent.date,
    time: supabaseEvent.time,
    location: supabaseEvent.location,
    category: supabaseEvent.category,
    status: supabaseEvent.status,
    featured: supabaseEvent.featured,
    imageUrl: supabaseEvent.image_url || undefined,
    slug: supabaseEvent.slug,
    participants: supabaseEvent.participants || undefined,
    tags: Array.isArray(supabaseEvent.tags) ? supabaseEvent.tags : [],
    ctaText: supabaseEvent.cta_text || undefined,
    ctaLink: supabaseEvent.cta_link || undefined,
    rsvpLink: supabaseEvent.rsvp_link || undefined,
    googleCalendarLink: supabaseEvent.google_calendar_link || undefined,
    createdAt: supabaseEvent.created_at,
    updatedAt: supabaseEvent.updated_at,
  };
}

// Generate unique slug
async function generateUniqueSlug(title: string): Promise<string> {
  let baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    const { data, error } = await supabase
      .from('events')
      .select('id')
      .eq('slug', slug)
      .single();
    
    if (error && error.code === 'PGRST116') {
      // No event found with this slug, it's unique
      break;
    }
    
    if (error) {
      console.error('Error checking slug uniqueness:', error);
      break;
    }
    
    // Slug exists, try with counter
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

// Transform Event to Supabase format
function transformEventToSupabase(event: Partial<Event>): SupabaseEventInsert | SupabaseEventUpdate {
  const supabaseData: SupabaseEventInsert | SupabaseEventUpdate = {
    title: event.title,
    description: event.description,
    date: event.date,
    time: event.time,
    location: event.location,
    category: event.category,
    status: event.status,
    featured: event.featured,
    image_url: event.imageUrl,
    slug: event.slug,
    participants: event.participants,
    tags: event.tags,
    cta_text: event.ctaText,
    cta_link: event.ctaLink,
    rsvp_link: event.rsvpLink,
    google_calendar_link: event.googleCalendarLink,
  };

  // Filter out undefined values for updates
  return Object.fromEntries(
    Object.entries(supabaseData).filter(([, value]) => value !== undefined)
  ) as SupabaseEventInsert | SupabaseEventUpdate;
}

export const supabaseEventService = {
  // Get all events with optional filtering
  async getAllEvents(filters?: {
    category?: string;
    status?: string;
    featured?: boolean;
    search?: string;
  }): Promise<Event[]> {
    try {
      let query = supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })
        .order('time', { ascending: true });

      // Apply filters
      if (filters?.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }

      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      if (filters?.featured !== undefined) {
        query = query.eq('featured', filters.featured);
      }

      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase();
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching events from Supabase:', error);
        throw new Error('Failed to fetch events data');
      }

      // Transform and correct statuses based on current date
      const events = (data || []).map(transformSupabaseToEvent);
      
      // Update statuses based on current date
      return events.map(event => {
        const correctStatus = getEventStatus(event.date, event.time);
        return {
          ...event,
          status: correctStatus
        };
      });
    } catch (error) {
      console.error('Error in getAllEvents:', error);
      throw error;
    }
  },

  // Get upcoming events
  async getUpcomingEvents(): Promise<Event[]> {
    try {
      const allEvents = await this.getAllEvents();
      return allEvents.filter(event => event.status === 'Upcoming');
    } catch (error) {
      console.error('Error in getUpcomingEvents:', error);
      throw error;
    }
  },

  // Get past events
  async getPastEvents(): Promise<Event[]> {
    try {
      const allEvents = await this.getAllEvents();
      return allEvents.filter(event => event.status === 'Past');
    } catch (error) {
      console.error('Error in getPastEvents:', error);
      throw error;
    }
  },

  // Get event by slug
  async getEventBySlug(slug: string): Promise<Event | null> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No event found
        }
        console.error('Error fetching event by slug:', error);
        throw new Error('Failed to fetch event');
      }

      const event = transformSupabaseToEvent(data);
      const correctStatus = getEventStatus(event.date, event.time);
      return {
        ...event,
        status: correctStatus
      };
    } catch (error) {
      console.error('Error in getEventBySlug:', error);
      throw error;
    }
  },

  // Add new event
  async addEvent(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> {
    try {
      // Generate unique slug from title if not provided
      const slug = event.slug || await generateUniqueSlug(event.title);

      const supabaseData = {
        ...transformEventToSupabase(event),
        slug,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as SupabaseEventInsert;

      const { data, error } = await supabase
        .from('events')
        .insert(supabaseData)
        .select()
        .single();

      if (error) {
        console.error('Error adding event to Supabase:', error);
        throw new Error('Failed to add event');
      }

      return transformSupabaseToEvent(data);
    } catch (error) {
      console.error('Error in addEvent:', error);
      throw error;
    }
  },

  // Update existing event
  async updateEvent(id: number, updates: Partial<Event>): Promise<Event> {
    try {
      const supabaseData = {
        ...transformEventToSupabase(updates),
        updated_at: new Date().toISOString(),
      } as SupabaseEventUpdate;

      const { data, error } = await supabase
        .from('events')
        .update(supabaseData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating event in Supabase:', error);
        throw new Error('Failed to update event');
      }

      return transformSupabaseToEvent(data);
    } catch (error) {
      console.error('Error in updateEvent:', error);
      throw error;
    }
  },

  // Delete event
  async deleteEvent(id: number): Promise<void> {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting event from Supabase:', error);
        throw new Error('Failed to delete event');
      }
    } catch (error) {
      console.error('Error in deleteEvent:', error);
      throw error;
    }
  },

  // Get all unique categories
  async getAllCategories(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('category')
        .not('category', 'is', null)
        .distinct('category');

      if (error) {
        console.error('Error fetching categories from Supabase:', error);
        throw new Error('Failed to fetch categories');
      }

      const categories = (data || []).map(row => row.category as string).sort();
      return ['All', ...categories]; // Add 'All' option
    } catch (error) {
      console.error('Error in getAllCategories:', error);
      throw error;
    }
  },

  // Update outdated events status
  async updateOutdatedEvents(): Promise<void> {
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
        throw new Error('Failed to update outdated events');
      }
    } catch (error) {
      console.error('Error in updateOutdatedEvents:', error);
      throw error;
    }
  },
};
