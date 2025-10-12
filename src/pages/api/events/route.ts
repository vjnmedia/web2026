import { NextRequest, NextResponse } from 'next/server';

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: 'Youth Leadership Summit 2024',
    date: '2024-12-15',
    time: '09:00:00',
    category: 'Peacebuilding',
    status: 'Upcoming',
    location: 'Kigali Convention Centre',
    description: 'Annual summit bringing together young leaders from across the region',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
    slug: 'youth-leadership-summit-2024',
    participants: 150,
    tags: ['leadership', 'youth', 'summit'],
    ctaText: 'Register Now',
    ctaLink: '/register/summit',
    rsvpLink: '/rsvp/summit',
    googleCalendarLink: 'https://calendar.google.com/event',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Community Sports Day',
    date: '2024-11-20',
    time: '14:00:00',
    category: 'Sports',
    status: 'Upcoming',
    location: 'VJN Sports Complex',
    description: 'Fun-filled sports activities for the whole community',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    slug: 'community-sports-day',
    participants: 200,
    tags: ['sports', 'community', 'fun'],
    ctaText: 'Join Us',
    ctaLink: '/sports-day',
    rsvpLink: '/rsvp/sports',
    googleCalendarLink: 'https://calendar.google.com/event',
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Helper function to determine event status based on date
const getEventStatus = (date: string, time: string): 'Upcoming' | 'Past' => {
  const now = new Date();
  const eventDateTime = new Date(`${date}T${time || '00:00:00'}`);
  return eventDateTime >= now ? 'Upcoming' : 'Past';
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    let filteredEvents = [...mockEvents];
    
    if (status) {
      filteredEvents = filteredEvents.filter(event => event.status === status);
    }
    
    if (category) {
      filteredEvents = filteredEvents.filter(event => event.category === category);
    }
    
    if (featured !== null) {
      const isFeatured = featured === 'true';
      filteredEvents = filteredEvents.filter(event => event.featured === isFeatured);
    }

    // Correct event statuses based on current date
    const correctedEvents = filteredEvents.map(event => ({
      ...event,
      status: getEventStatus(event.date, event.time)
    }));

    return NextResponse.json(correctedEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newEvent = {
      id: Date.now(),
      ...body,
      slug,
      tags: body.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
} 