-- Create slider table
CREATE TABLE IF NOT EXISTS slider (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    image_webp TEXT,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    language TEXT NOT NULL DEFAULT 'en',
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS slider_language_idx ON slider(language);
CREATE INDEX IF NOT EXISTS slider_order_idx ON slider(order_index);
CREATE INDEX IF NOT EXISTS slider_active_idx ON slider(is_active);

-- Set up Row Level Security (RLS)
ALTER TABLE slider ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Slider items are viewable by everyone" ON slider
    FOR SELECT
    USING (true);

CREATE POLICY "Slider items can be created by admins and editors" ON slider
    FOR INSERT
    TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
    ));

CREATE POLICY "Slider items can be updated by admins and editors" ON slider
    FOR UPDATE
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
    ));

CREATE POLICY "Slider items can be deleted by admins" ON slider
    FOR DELETE
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    ));

-- Create trigger for updated_at
CREATE TRIGGER update_slider_updated_at
    BEFORE UPDATE ON slider
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for slider images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('slider', 'slider', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for slider bucket
CREATE POLICY "Slider images are publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'slider');

CREATE POLICY "Slider images can be uploaded by admins and editors"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'slider' AND
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'editor')
        )
    );

CREATE POLICY "Slider images can be updated by admins and editors"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
        bucket_id = 'slider' AND
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'editor')
        )
    );

CREATE POLICY "Slider images can be deleted by admins"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'slider' AND
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    ); 