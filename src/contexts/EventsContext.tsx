import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { supabaseEventService } from '@/services/supabaseEventService';
import { Event } from '@/services/eventService';

interface EventsContextType {
  events: Event[];
  loading: boolean;
  error: string | null;
  addEvent: (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateEvent: (id: number, event: Partial<Event>) => Promise<void>;
  deleteEvent: (id: number) => Promise<void>;
  fetchEvents: () => Promise<void>;
  getAllCategories: () => Promise<string[]>;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await supabaseEventService.getAllEvents();
      setEvents(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch events';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (newEvent: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const addedEvent = await supabaseEventService.addEvent(newEvent);
      setEvents(prev => [...prev, addedEvent]);
      toast.success('Event added successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add event';
      toast.error(errorMessage);
      throw err;
    }
  };

  const updateEvent = async (id: number, updates: Partial<Event>) => {
    try {
      const updatedEvent = await supabaseEventService.updateEvent(id, updates);
      setEvents(prev => prev.map(event =>
        event.id === id ? updatedEvent : event
      ));
      toast.success('Event updated successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update event';
      toast.error(errorMessage);
      throw err;
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      await supabaseEventService.deleteEvent(id);
      setEvents(prev => prev.filter(event => event.id !== id));
      toast.success('Event deleted successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete event';
      toast.error(errorMessage);
      throw err;
    }
  };

  const getAllCategories = async (): Promise<string[]> => {
    try {
      return await supabaseEventService.getAllCategories();
    } catch (err) {
      console.error('Error fetching categories:', err);
      return ['All'];
    }
  };

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const value: EventsContextType = {
    events,
    loading,
    error,
    addEvent,
    updateEvent,
    deleteEvent,
    fetchEvents,
    getAllCategories,
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = (): EventsContextType => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};
