import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, Users, Star, CheckCircle, ChevronRight, Search, Tag, Award, Heart, Globe, BookOpen, Filter, Calendar as CalendarIcon, ExternalLink, Clock } from 'lucide-react';
import { useEvents } from '@/hooks/useEvents';
import { Event } from '@/services/eventService';

const eventCategories = [
  { label: 'Peacebuilding', icon: <Globe className="h-4 w-4 mr-1" />, color: 'bg-blue-100 text-blue-800' },
  { label: 'Health', icon: <Heart className="h-4 w-4 mr-1" />, color: 'bg-red-100 text-red-800' },
  { label: 'Sports', icon: <Award className="h-4 w-4 mr-1" />, color: 'bg-green-100 text-green-800' },
  { label: 'Arts', icon: <BookOpen className="h-4 w-4 mr-1" />, color: 'bg-purple-100 text-purple-800' },
  { label: 'Economic Empowerment', icon: <Tag className="h-4 w-4 mr-1" />, color: 'bg-yellow-100 text-yellow-800' },
];

const Events: React.FC = () => {
  const { t } = useTranslation();
  const { data: events = [], isLoading, error } = useEvents();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  // Filter and categorize events
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = search ? 
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase()) : true;
      
      const matchesCategory = selectedCategory ? event.category === selectedCategory : true;
      
      const matchesYear = selectedYear ? {
        '2024': event.date.startsWith('2024'),
        '2025': event.date.startsWith('2025'),
        '2026': event.date.startsWith('2026'),
      }[selectedYear] || true : true;

      return matchesSearch && matchesCategory && matchesYear;
    });
  }, [events, search, selectedCategory, selectedYear]);

  const upcomingEvents = useMemo(() => 
    filteredEvents.filter(event => event.status === 'Upcoming')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [filteredEvents]
  );

  const pastEvents = useMemo(() => 
    filteredEvents.filter(event => event.status === 'Past')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [filteredEvents]
  );

  const years = useMemo(() => {
    const uniqueYears = [...new Set(events.map(event => event.date.split('-')[0]))];
    return uniqueYears.sort((a, b) => b.localeCompare(a));
  }, [events]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    const cat = eventCategories.find(c => c.label === category);
    return cat?.color || 'bg-gray-100 text-gray-800';
  };

  const generateGoogleCalendarLink = (event: Event) => {
    try {
      // Parse the time string to 24-hour format
      const parseTime = (timeStr: string) => {
        const time = timeStr.trim();
        const isPM = time.toLowerCase().includes('pm');
        const timeWithoutAMPM = time.replace(/am|pm/gi, '').trim();
        const [hours, minutes] = timeWithoutAMPM.split(':').map(Number);
        
        let hour24 = hours;
        if (isPM && hours !== 12) hour24 += 12;
        if (!isPM && hours === 12) hour24 = 0;
        
        return `${hour24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      };

      const time24Hour = parseTime(event.time);
      const startDate = new Date(`${event.date}T${time24Hour}:00`);
      const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours later
      
      const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.title,
        dates: `${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        details: event.description,
        location: event.location,
      });
      
      return `https://calendar.google.com/calendar/render?${params.toString()}`;
    } catch (error) {
      console.error('Error generating Google Calendar link:', error);
      // Return a fallback link without specific time
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vjn-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading events. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-vjn-blue/90 to-vjn-green/80 py-16 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
          {t('events.title', 'Discover Our Events')}
        </h1>
        <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto mb-8">
          {t('events.subtitle', 'Join us in creating positive change through our diverse range of events and activities.')}
        </p>
        
        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-vjn-blue" />
            <input
              type="text"
              placeholder={t('events.searchPlaceholder', 'Search events...')}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-vjn-blue focus:ring-2 focus:ring-vjn-green outline-none text-gray-700"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {eventCategories.map(cat => (
                <button
                  key={cat.label}
                  className={`flex items-center px-4 py-2 rounded-full border transition text-sm font-medium ${
                    selectedCategory === cat.label 
                      ? 'bg-vjn-green text-white border-vjn-green' 
                      : 'bg-white text-vjn-blue border-vjn-blue hover:bg-vjn-blue hover:text-white'
                  }`}
                  onClick={() => setSelectedCategory(selectedCategory === cat.label ? '' : cat.label)}
                >
                  {cat.icon}{cat.label}
                </button>
              ))}
            </div>
            
            {/* Year Filter */}
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="px-4 py-2 rounded-full border border-vjn-blue bg-white text-vjn-blue focus:ring-2 focus:ring-vjn-green outline-none"
            >
              <option value="">{t('events.allYears', 'All Years')}</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Events Tabs */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2 rounded-md font-medium transition ${
                activeTab === 'upcoming'
                  ? 'bg-white text-vjn-blue shadow-sm'
                  : 'text-gray-600 hover:text-vjn-blue'
              }`}
            >
              <Star className="inline h-4 w-4 mr-2" />
              {t('events.upcoming', 'Upcoming Events')} ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-2 rounded-md font-medium transition ${
                activeTab === 'past'
                  ? 'bg-white text-vjn-blue shadow-sm'
                  : 'text-gray-600 hover:text-vjn-blue'
              }`}
            >
              <CheckCircle className="inline h-4 w-4 mr-2" />
              {t('events.past', 'Past Events')} ({pastEvents.length})
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {activeTab === 'upcoming' ? (
          <div className="space-y-8">
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-12">
                <CalendarIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {t('events.noUpcoming', 'No upcoming events')}
                </h3>
                <p className="text-gray-500">
                  {t('events.noUpcomingDesc', 'Check back soon for new events!')}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} type="upcoming" />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {pastEvents.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {t('events.noPast', 'No past events')}
                </h3>
                <p className="text-gray-500">
                  {t('events.noPastDesc', 'No past events found.')}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pastEvents.map(event => (
                  <EventCard key={event.id} event={event} type="past" />
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* CTA Banner */}
      <section className="w-full bg-gradient-to-r from-vjn-blue/90 to-vjn-green/80 py-12 px-4 text-center rounded-2xl max-w-5xl mx-auto mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {t('events.getInvolved', 'Want to Get Involved?')}
        </h3>
        <p className="text-lg text-white/90 mb-6">
          {t('events.getInvolvedDesc', 'Join our next event and be part of the movement.')}
        </p>
        <button className="px-8 py-3 rounded-full bg-white text-vjn-blue font-bold text-lg shadow hover:bg-vjn-green hover:text-white transition">
          {t('events.seeAllEvents', 'See All Events')}
        </button>
      </section>
    </div>
  );
};

// Event Card Component
interface EventCardProps {
  event: Event;
  type: 'upcoming' | 'past';
}

const EventCard: React.FC<EventCardProps> = ({ event, type }) => {
  const { t } = useTranslation();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    const cat = eventCategories.find(c => c.label === category);
    return cat?.color || 'bg-gray-100 text-gray-800';
  };

  const generateGoogleCalendarLink = (event: Event) => {
    try {
      // Parse the time string to 24-hour format
      const parseTime = (timeStr: string) => {
        const time = timeStr.trim();
        const isPM = time.toLowerCase().includes('pm');
        const timeWithoutAMPM = time.replace(/am|pm/gi, '').trim();
        const [hours, minutes] = timeWithoutAMPM.split(':').map(Number);
        
        let hour24 = hours;
        if (isPM && hours !== 12) hour24 += 12;
        if (!isPM && hours === 12) hour24 = 0;
        
        return `${hour24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      };

      const time24Hour = parseTime(event.time);
      const startDate = new Date(`${event.date}T${time24Hour}:00`);
      const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours later
      
      const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.title,
        dates: `${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        details: event.description,
        location: event.location,
      });
      
      return `https://calendar.google.com/calendar/render?${params.toString()}`;
    } catch (error) {
      console.error('Error generating Google Calendar link:', error);
      // Return a fallback link without specific time
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    }
  };

  if (type === 'upcoming') {
    return (
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-vjn-blue/10 overflow-hidden group">
        {event.featured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              {t('events.featured', 'Featured')}
            </span>
          </div>
        )}
        
        <div className="relative">
          <img 
            src={event.imageUrl || '/images/placeholder.svg'} 
            alt={event.title} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
              {event.category}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-vjn-green" />
            <span className="text-sm font-semibold text-vjn-green">
              {formatDate(event.date)} • {event.time}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-vjn-blue mb-2 line-clamp-2">
            {event.title}
          </h3>
          
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <MapPin className="h-4 w-4 mr-1 text-vjn-blue" />
            <span>{event.location}</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {event.description}
          </p>
          
          <div className="flex items-center gap-2">
            {event.ctaLink ? (
              <a 
                href={event.ctaLink}
                className="px-4 py-2 rounded-full bg-vjn-green text-white font-semibold hover:bg-vjn-blue transition text-sm flex items-center"
              >
                {event.ctaText || t('events.joinNow', 'Join Now')}
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            ) : (
              <button className="px-4 py-2 rounded-full bg-vjn-green text-white font-semibold hover:bg-vjn-blue transition text-sm flex items-center">
                {t('events.joinNow', 'Join Now')}
                <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            )}
            
            <a
              href={generateGoogleCalendarLink(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-vjn-blue hover:text-white transition"
              title={t('events.addToCalendar', 'Add to Google Calendar')}
            >
              <CalendarIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Past event card
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition flex flex-col md:flex-row border border-gray-200 relative opacity-90">
      <div className="relative md:w-1/3">
        <img 
          src={event.imageUrl || '/images/placeholder.svg'} 
          alt={event.title} 
          className="w-full h-40 md:h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none grayscale"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-gray-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            {t('events.past', 'Past')}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-4 w-4 text-vjn-blue" />
          <span className="text-sm font-semibold text-vjn-blue">
            {formatDate(event.date)} • {event.time}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {event.title}
        </h3>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1 text-vjn-blue" />
          <span>{event.location}</span>
        </div>
        
        {event.participants && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <Users className="h-4 w-4 text-vjn-green" />
            <span>{event.participants} {t('events.participants', 'participants')}</span>
          </div>
        )}
        
        <div className="mt-auto flex items-center gap-2">
          {event.ctaLink ? (
            <a 
              href={event.ctaLink}
              className="px-4 py-2 rounded-full bg-vjn-blue text-white font-semibold hover:bg-vjn-green transition text-sm flex items-center"
            >
              {event.ctaText || t('events.readRecap', 'Read Recap')}
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          ) : (
            <span className="px-4 py-2 rounded-full bg-gray-200 text-gray-600 text-sm">
              {t('events.eventCompleted', 'Event Completed')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events; 