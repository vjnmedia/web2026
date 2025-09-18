import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventService, Event } from '@/services/eventService';

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: eventService.getAllEvents,
  });
};

export const useUpcomingEvents = () => {
  return useQuery({
    queryKey: ['events', 'upcoming'],
    queryFn: eventService.getUpcomingEvents,
  });
};

export const usePastEvents = () => {
  return useQuery({
    queryKey: ['events', 'past'],
    queryFn: eventService.getPastEvents,
  });
};

export const useEventsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['events', 'category', category],
    queryFn: () => eventService.getEventsByCategory(category),
    enabled: !!category,
  });
};

export const useEvent = (id: number) => {
  return useQuery({
    queryKey: ['events', id],
    queryFn: () => eventService.getEvent(id),
    enabled: !!id,
  });
};

export const useEventBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['events', 'slug', slug],
    queryFn: () => eventService.getEventBySlug(slug),
    enabled: !!slug,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: eventService.createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, event }: { id: number; event: Partial<Event> }) =>
      eventService.updateEvent(id, event),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['events', data.id] });
      queryClient.invalidateQueries({ queryKey: ['events', 'slug', data.slug] });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: eventService.deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

export const useUploadEventImage = () => {
  return useMutation({
    mutationFn: eventService.uploadImage,
  });
}; 