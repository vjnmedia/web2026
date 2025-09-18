
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, Eye, Calendar, Image as ImageIcon, CheckCircle, XCircle, Star, Upload, ExternalLink } from 'lucide-react';
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent, useUploadEventImage } from '@/hooks/useEvents';
import { Event } from '@/services/eventService';

const categories = ['Peacebuilding', 'Sports', 'Health', 'Arts', 'Economic Empowerment'];
const statuses = ['Upcoming', 'Past', 'Draft', 'Archived'];

const EventsManagement: React.FC = () => {
  const { data: events = [], isLoading, error } = useEvents();
  const createEventMutation = useCreateEvent();
  const updateEventMutation = useUpdateEvent();
  const deleteEventMutation = useDeleteEvent();
  const uploadImageMutation = useUploadEventImage();

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [form, setForm] = useState({
    id: null as number | null,
    title: '',
    date: '',
    time: '',
    category: '',
    status: 'Upcoming' as 'Upcoming' | 'Past' | 'Draft' | 'Archived',
    location: '',
    description: '',
    imageUrl: '',
    slug: '',
    participants: 0,
    tags: [] as string[],
    ctaText: '',
    ctaLink: '',
    rsvpLink: '',
    googleCalendarLink: '',
    featured: false,
  });
  const [coverPreview, setCoverPreview] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [formError, setFormError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Filtered events
  const filtered = events.filter(e =>
    (search ? e.title.toLowerCase().includes(search.toLowerCase()) : true) &&
    (filterCategory ? e.category === filterCategory : true) &&
    (filterStatus ? e.status === filterStatus : true)
  );

  // Handlers
  const openAdd = () => {
    setForm({
      id: null,
      title: '',
      date: '',
      time: '',
      category: '',
      status: 'Upcoming',
      location: '',
      description: '',
      imageUrl: '',
      slug: '',
      participants: 0,
      tags: [],
      ctaText: '',
      ctaLink: '',
      rsvpLink: '',
      googleCalendarLink: '',
      featured: false,
    });
    setCoverPreview('');
    setEditEvent(null);
    setShowForm(true);
    setFormError('');
  };

  const openEdit = (event: Event) => {
    setForm({
      id: event.id,
      title: event.title,
      date: event.date,
      time: event.time,
      category: event.category,
      status: event.status,
      location: event.location,
      description: event.description,
      imageUrl: event.imageUrl || '',
      slug: event.slug,
      participants: event.participants || 0,
      tags: event.tags || [],
      ctaText: event.ctaText || '',
      ctaLink: event.ctaLink || '',
      rsvpLink: event.rsvpLink || '',
      googleCalendarLink: event.googleCalendarLink || '',
      featured: event.featured,
    });
    setCoverPreview(event.imageUrl || '');
    setEditEvent(event);
    setShowForm(true);
    setFormError('');
  };

  const closeForm = () => {
    setShowForm(false);
    setEditEvent(null);
    setFormError('');
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setForm(f => ({ 
      ...f, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const result = await uploadImageMutation.mutateAsync(file);
        setForm(f => ({ ...f, imageUrl: result.imageUrl }));
        setCoverPreview(result.imageUrl);
      } catch (error) {
        setFormError('Failed to upload image. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.time || !form.category || !form.location || !form.status) {
      setFormError('Please fill all required fields.');
      return;
    }

    try {
      if (editEvent) {
        await updateEventMutation.mutateAsync({
          id: form.id!,
          event: {
            title: form.title,
            date: form.date,
            time: form.time,
            category: form.category,
            status: form.status,
            location: form.location,
            description: form.description,
            imageUrl: form.imageUrl,
            participants: form.participants,
            tags: form.tags,
            ctaText: form.ctaText,
            ctaLink: form.ctaLink,
            rsvpLink: form.rsvpLink,
            googleCalendarLink: form.googleCalendarLink,
            featured: form.featured,
          }
        });
      } else {
        await createEventMutation.mutateAsync({
          title: form.title,
          date: form.date,
          time: form.time,
          category: form.category,
          status: form.status,
          location: form.location,
          description: form.description,
          imageUrl: form.imageUrl,
          slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          participants: form.participants,
          tags: form.tags,
          ctaText: form.ctaText,
          ctaLink: form.ctaLink,
          rsvpLink: form.rsvpLink,
          googleCalendarLink: form.googleCalendarLink,
          featured: form.featured,
        });
      }
      closeForm();
    } catch (error) {
      setFormError('Failed to save event. Please try again.');
    }
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteEventMutation.mutateAsync(deleteId);
        setShowDelete(false);
        setDeleteId(null);
      } catch (error) {
        setFormError('Failed to delete event. Please try again.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vjn-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading events. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-vjn-blue">Events Management</h2>
        <div className="flex gap-2">
          <Input 
            placeholder="Search events..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            className="max-w-xs" 
          />
          <select 
            value={filterCategory} 
            onChange={e => setFilterCategory(e.target.value)} 
            className="border rounded px-2 py-1"
          >
            <option value="">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select 
            value={filterStatus} 
            onChange={e => setFilterStatus(e.target.value)} 
            className="border rounded px-2 py-1"
          >
            <option value="">All Statuses</option>
            {statuses.map(st => <option key={st} value={st}>{st}</option>)}
          </select>
          <Button onClick={openAdd} className="bg-vjn-blue text-white">
            <Plus className="mr-2 h-4 w-4" />Add Event
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded shadow border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No events found.
                </TableCell>
              </TableRow>
            ) : filtered.map(ev => (
              <TableRow key={ev.id}>
                <TableCell className="font-semibold">{ev.title}</TableCell>
                <TableCell>
                  {new Date(ev.date).toLocaleDateString()} • {ev.time}
                </TableCell>
                <TableCell>{ev.category}</TableCell>
                <TableCell>
                  {ev.status === 'Upcoming' && (
                    <span className="text-vjn-green font-bold flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />Upcoming
                    </span>
                  )}
                  {ev.status === 'Past' && (
                    <span className="text-gray-400 font-bold flex items-center">
                      <XCircle className="h-4 w-4 mr-1" />Past
                    </span>
                  )}
                  {ev.status === 'Draft' && (
                    <span className="text-yellow-600 font-bold flex items-center">
                      <Star className="h-4 w-4 mr-1" />Draft
                    </span>
                  )}
                  {ev.status === 'Archived' && (
                    <span className="text-gray-500 font-bold flex items-center">Archived</span>
                  )}
                </TableCell>
                <TableCell>
                  {ev.featured ? (
                    <span className="text-vjn-blue font-bold">Yes</span>
                  ) : (
                    'No'
                  )}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => openEdit(ev)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => confirmDelete(ev.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto space-y-4 relative">
            <button 
              type="button" 
              onClick={closeForm} 
              className="absolute top-3 right-3 text-gray-400 hover:text-vjn-blue"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-2">
              {editEvent ? 'Edit Event' : 'Add Event'}
            </h3>
            {formError && (
              <div className="text-red-500 text-sm mb-2">{formError}</div>
            )}
            
            <div>
              <label className="block font-semibold mb-1">Title *</label>
              <Input 
                name="title" 
                value={form.title} 
                onChange={handleInput} 
                required 
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Cover Image</label>
              <div className="flex items-center gap-2">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleCover}
                  className="flex-1"
                />
                {isUploading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-vjn-blue"></div>
                )}
              </div>
              {coverPreview && (
                <img 
                  src={coverPreview} 
                  alt="cover preview" 
                  className="mt-2 w-full h-32 object-cover rounded" 
                />
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">Description *</label>
              <textarea 
                name="description" 
                value={form.description} 
                onChange={handleInput} 
                rows={3} 
                className="w-full border rounded p-2" 
                required 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Date *</label>
                <Input 
                  name="date" 
                  type="date" 
                  value={form.date} 
                  onChange={handleInput} 
                  required 
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Time *</label>
                <Input 
                  name="time" 
                  type="time" 
                  value={form.time} 
                  onChange={handleInput} 
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Location *</label>
                <Input 
                  name="location" 
                  value={form.location} 
                  onChange={handleInput} 
                  required 
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Participants</label>
                <Input 
                  name="participants" 
                  type="number" 
                  value={form.participants} 
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Category *</label>
                <select 
                  name="category" 
                  value={form.category} 
                  onChange={handleInput} 
                  className="w-full border rounded p-2" 
                  required
                >
                  <option value="">Select</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Status *</label>
                <select 
                  name="status" 
                  value={form.status} 
                  onChange={handleInput} 
                  className="w-full border rounded p-2" 
                  required
                >
                  {statuses.map(st => <option key={st} value={st}>{st}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Tags (comma separated)</label>
              <Input 
                name="tags" 
                value={form.tags.join(', ')} 
                onChange={e => setForm(f => ({ 
                  ...f, 
                  tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                }))} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">CTA Button Text</label>
                <Input 
                  name="ctaText" 
                  value={form.ctaText} 
                  onChange={handleInput} 
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">CTA Link</label>
                <Input 
                  name="ctaLink" 
                  value={form.ctaLink} 
                  onChange={handleInput} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">RSVP Link</label>
                <Input 
                  name="rsvpLink" 
                  value={form.rsvpLink} 
                  onChange={handleInput} 
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Google Calendar Link</label>
                <Input 
                  name="googleCalendarLink" 
                  value={form.googleCalendarLink} 
                  onChange={handleInput} 
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                name="featured" 
                checked={form.featured} 
                onChange={handleInput} 
                id="featured" 
              />
              <label htmlFor="featured" className="font-semibold">
                Mark as Featured
              </label>
            </div>

            <Button 
              type="submit" 
              className="bg-vjn-blue text-white w-full mt-2"
              disabled={createEventMutation.isPending || updateEventMutation.isPending}
            >
              {createEventMutation.isPending || updateEventMutation.isPending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                editEvent ? 'Update Event' : 'Create Event'
              )}
            </Button>
          </form>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm text-center">
            <h3 className="text-xl font-bold mb-4">Delete Event?</h3>
            <p className="mb-6">
              Are you sure you want to delete this event? This action cannot be undone.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={handleDelete} 
                className="bg-red-500 text-white"
                disabled={deleteEventMutation.isPending}
              >
                {deleteEventMutation.isPending ? 'Deleting...' : 'Delete'}
              </Button>
              <Button onClick={() => setShowDelete(false)} className="bg-gray-200">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsManagement;
