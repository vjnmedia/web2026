-- Safe events table and storage setup
-- This migration safely handles existing events table and policies

-- Create events table if it doesn't exist
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,  -- Changed to SERIAL for auto-incrementing integer
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Draft' CHECK (status IN ('Upcoming', 'Past', 'Draft', 'Archived')),
    featured BOOLEAN NOT NULL DEFAULT false,
    image_url TEXT,
    slug TEXT UNIQUE NOT NULL,
    participants INTEGER,
    tags JSONB DEFAULT '[]'::jsonb,
    cta_text TEXT,
    cta_link TEXT,
    rsvp_link TEXT,
    google_calendar_link TEXT,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS events_slug_idx ON events(slug);
CREATE INDEX IF NOT EXISTS events_date_idx ON events(date);
CREATE INDEX IF NOT EXISTS events_status_idx ON events(status);
CREATE INDEX IF NOT EXISTS events_category_idx ON events(category);

-- Enable RLS if not already enabled
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Events are viewable by everyone" ON events;
DROP POLICY IF EXISTS "Events can be created by authenticated users" ON events;
DROP POLICY IF EXISTS "Events can be updated by authenticated users" ON events;
DROP POLICY IF EXISTS "Events can be deleted by admins only" ON events;

-- Create policies
CREATE POLICY "Events are viewable by everyone" ON events
    FOR SELECT
    USING (true);

CREATE POLICY "Events can be created by authenticated users" ON events
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Events can be updated by authenticated users" ON events
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Events can be deleted by admins only" ON events
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Create or replace the update trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for event images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('events', 'events', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Event images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Event images can be uploaded by admins and editors" ON storage.objects;
DROP POLICY IF EXISTS "Event images can be updated by admins and editors" ON storage.objects;
DROP POLICY IF EXISTS "Event images can be deleted by admins" ON storage.objects;

-- Set up storage policies for events bucket
CREATE POLICY "Event images are publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'events');

CREATE POLICY "Event images can be uploaded by admins and editors"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'events' AND
        (
            -- Allow if user has admin role in profiles table
            EXISTS (
                SELECT 1 FROM profiles 
                WHERE id = auth.uid() 
                AND role IN ('admin', 'editor')
            )
            OR
            -- Allow if user has admin role in auth metadata
            EXISTS (
                SELECT 1 FROM auth.users
                WHERE auth.users.id = auth.uid()
                AND auth.users.raw_user_meta_data->>'role' = 'admin'
            )
        )
    );

CREATE POLICY "Event images can be updated by admins and editors"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
        bucket_id = 'events' AND
        (
            EXISTS (
                SELECT 1 FROM profiles 
                WHERE id = auth.uid() 
                AND role IN ('admin', 'editor')
            )
            OR
            EXISTS (
                SELECT 1 FROM auth.users
                WHERE auth.users.id = auth.uid()
                AND auth.users.raw_user_meta_data->>'role' = 'admin'
            )
        )
    );

CREATE POLICY "Event images can be deleted by admins"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'events' AND
        (
            EXISTS (
                SELECT 1 FROM profiles 
                WHERE id = auth.uid() 
                AND role = 'admin'
            )
            OR
            EXISTS (
                SELECT 1 FROM auth.users
                WHERE auth.users.id = auth.uid()
                AND auth.users.raw_user_meta_data->>'role' = 'admin'
            )
        )
    );
