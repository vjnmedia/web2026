
import { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, Eye, Calendar } from 'lucide-react';

// Mock data for events
const mockEvents = [
  { 
    id: 1, 
    name: "Youth Leadership Summit", 
    date: "2023-08-15", 
    location: "Kigali Convention Center", 
    attendees: 200,
    status: "Upcoming"
  },
  { 
    id: 2, 
    name: "Peace Building Workshop", 
    date: "2023-07-20", 
    location: "VJN Headquarters", 
    attendees: 50,
    status: "Upcoming"
  },
  { 
    id: 3, 
    name: "Community Health Drive", 
    date: "2023-06-10", 
    location: "Nyamirambo Center", 
    attendees: 120,
    status: "Completed"
  },
  { 
    id: 4, 
    name: "Sports Tournament Finals", 
    date: "2023-09-05", 
    location: "Amahoro Stadium", 
    attendees: 350,
    status: "Planned"
  },
];

const EventsManagement = () => {
  const { t } = useLanguage();
  const [events, setEvents] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEvent = () => {
    console.log("Add new event");
  };

  const handleViewEvent = (id: number) => {
    console.log("View event with id:", id);
  };

  const handleEditEvent = (id: number) => {
    console.log("Edit event with id:", id);
  };

  const handleDeleteEvent = (id: number) => {
    console.log("Delete event with id:", id);
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{t('dashboard.eventsManagement')}</h2>
        <Button onClick={handleAddEvent} className="bg-vjn-blue hover:bg-vjn-light-blue">
          <Plus className="mr-2 h-4 w-4" />
          {t('dashboard.addEvent')}
        </Button>
      </div>
      
      <div className="flex items-center">
        <Input
          placeholder={t('dashboard.searchEvents')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('dashboard.eventName')}</TableHead>
              <TableHead>{t('dashboard.date')}</TableHead>
              <TableHead>{t('dashboard.location')}</TableHead>
              <TableHead>{t('dashboard.attendees')}</TableHead>
              <TableHead>{t('dashboard.status')}</TableHead>
              <TableHead className="text-right">{t('dashboard.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  {t('dashboard.noEvents')}
                </TableCell>
              </TableRow>
            ) : (
              filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.attendees}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 
                      event.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {event.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewEvent(event.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEditEvent(event.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(event.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">{t('dashboard.upcomingEvents')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events
            .filter(event => event.status === 'Upcoming')
            .map(event => (
              <div key={event.id} className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-lg">{event.name}</h4>
                    <p className="text-gray-500">{event.location}</p>
                  </div>
                  <Calendar className="h-5 w-5 text-vjn-blue" />
                </div>
                <div className="mt-4">
                  <p className="text-sm"><strong>{t('dashboard.date')}:</strong> {event.date}</p>
                  <p className="text-sm"><strong>{t('dashboard.expectedAttendees')}:</strong> {event.attendees}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="mt-4 w-full"
                  onClick={() => handleViewEvent(event.id)}
                >
                  {t('dashboard.viewDetails')}
                </Button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default EventsManagement;
