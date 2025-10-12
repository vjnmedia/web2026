import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, CheckCircle, XCircle, Clock } from 'lucide-react';
import { supabaseEventService } from '@/services/supabaseEventService';
import { Event } from '@/services/eventService';

const statusColor = (status: string) => {
  if (status === 'Upcoming') return 'text-vjn-green';
  if (status === 'Past') return 'text-gray-400';
  return 'text-vjn-blue';
};

// Helper function to check if an event is outdated
const isEventOutdated = (eventDate: string, eventTime?: string) => {
  const now = new Date();
  const eventDateTime = new Date(`${eventDate}T${eventTime || '00:00:00'}`);
  return eventDateTime < now;
};

// Helper function to format relative time
const getRelativeTime = (eventDate: string, eventTime?: string) => {
  const now = new Date();
  const eventDateTime = new Date(`${eventDate}T${eventTime || '00:00:00'}`);
  const diffInMs = eventDateTime.getTime() - now.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Tomorrow';
  if (diffInDays < 7) return `In ${diffInDays} days`;
  if (diffInDays < 30) return `In ${Math.ceil(diffInDays / 7)} weeks`;
  return `In ${Math.ceil(diffInDays / 30)} months`;
};

// Helper function to filter and update event status
const filterUpcomingEvents = (events: Event[]): Event[] => {
  const now = new Date();
  return events.filter(event => {
    const eventDateTime = new Date(`${event.date}T${event.time || '00:00:00'}`);
    return eventDateTime >= now;
  }).sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time || '00:00:00'}`);
    const dateB = new Date(`${b.date}T${b.time || '00:00:00'}`);
    return dateA.getTime() - dateB.getTime();
  });
};

const EventsSlider: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get all events from Supabase
      const allEvents = await supabaseEventService.getAllEvents();
      
      // Filter for truly upcoming events (not just status-based)
      const upcomingEvents = filterUpcomingEvents(allEvents);
      
      // Limit to 4 events for the slider
      setEvents(upcomingEvents.slice(0, 4));
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Error loading events. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    
    // Refresh events every 5 minutes to check for outdated events
    const interval = setInterval(fetchEvents, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center bg-white rounded-full shadow-md px-6 py-4 md:py-6 md:px-8 animate-pulse">
            <div className="flex-shrink-0">
              <div className="w-28 h-20 md:w-36 md:h-24 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex-1 ml-6 md:ml-10">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-1"></div>
              <div className="h-4 bg-gray-200 rounded mb-1"></div>
            </div>
            <div className="ml-auto flex-shrink-0">
              <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
          <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Upcoming Events
          </h3>
          <p className="text-gray-500 mb-4">
            There are currently no upcoming events scheduled. Check back soon for new events!
          </p>
          <div className="flex items-center justify-center text-sm text-gray-400">
            <Clock className="h-4 w-4 mr-2" />
            <span>Last updated: {lastUpdated.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with refresh button */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-500 flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          <span>Last updated: {lastUpdated.toLocaleString()}</span>
        </div>
        <button
          onClick={fetchEvents}
          disabled={isLoading}
          className="px-4 py-2 text-sm bg-vjn-blue text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-center bg-white rounded-full shadow-md px-6 py-4 md:py-6 md:px-8 transition hover:shadow-lg"
          >
          {/* Event Image */}
          <div className="flex-shrink-0">
            <img
              src={event.imageUrl || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'}
              alt={event.title}
              className="w-28 h-20 md:w-36 md:h-24 object-cover rounded-full border-4 border-vjn-blue bg-gray-100 shadow"
              style={{ aspectRatio: '3/2' }}
            />
          </div>
          {/* Event Info */}
          <div className="flex-1 ml-6 md:ml-10">
            <div className="flex items-center space-x-2 mb-1">
              <Calendar className="h-4 w-4 text-vjn-green" />
              <span className="text-xs md:text-sm font-semibold text-vjn-green uppercase tracking-wide">
                {new Date(event.date).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
              <span className="text-xs bg-vjn-green/10 text-vjn-green px-2 py-1 rounded-full">
                {getRelativeTime(event.date, event.time)}
              </span>
            </div>
            <h3 className="text-lg md:text-2xl font-bold text-vjn-blue mb-1 flex items-center">
              {event.title}
              {event.status === 'Upcoming' ? (
                <CheckCircle className="ml-2 h-5 w-5 text-vjn-green" title="Upcoming" />
              ) : (
                <XCircle className="ml-2 h-5 w-5 text-gray-400" title="Past" />
              )}
            </h3>
            <div className="flex items-center text-gray-500 text-xs md:text-sm mb-1">
              <MapPin className="h-4 w-4 mr-1 text-vjn-blue" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-gray-500 text-xs md:text-sm mb-1">
              <Users className="h-4 w-4 mr-1 text-vjn-blue" />
              <span>{event.participants || 0} participants</span>
            </div>
            <div className="flex items-center text-gray-500 text-xs md:text-sm mb-1">
              <span className="font-semibold text-vjn-blue">Time:</span>
              <span className="ml-1">{event.time}</span>
            </div>
            <p className="text-gray-600 text-xs md:text-sm mt-1 line-clamp-2">{event.description}</p>
          </div>
          {/* Action Button */}
          <div className="ml-auto flex-shrink-0">
            <button
              className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-vjn-green text-vjn-green font-semibold hover:bg-vjn-green hover:text-white transition text-xs md:text-sm"
              style={{ minWidth: '80px', minHeight: '80px' }}
            >
              View Details
            </button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSlider; 