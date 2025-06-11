-- Create system_settings table
CREATE TABLE IF NOT EXISTS system_settings (
    id bigint PRIMARY KEY DEFAULT 1,
    site_name text NOT NULL DEFAULT 'Vision Jeunesse Nouvelle',
    site_description text NOT NULL DEFAULT 'Empowering youth for a better future',
    maintenance_mode boolean NOT NULL DEFAULT false,
    default_language text NOT NULL DEFAULT 'en',
    theme text NOT NULL DEFAULT 'light',
    email_notifications boolean NOT NULL DEFAULT true,
    backup_frequency text NOT NULL DEFAULT 'daily',
    security_level text NOT NULL DEFAULT 'high',
    api_enabled boolean NOT NULL DEFAULT false,
    cache_enabled boolean NOT NULL DEFAULT true,
    log_retention integer NOT NULL DEFAULT 30,
    smtp_host text,
    smtp_port integer DEFAULT 587,
    smtp_user text,
    smtp_secure boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT system_settings_single_row CHECK (id = 1)
);

-- Create backups table
CREATE TABLE IF NOT EXISTS backups (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    size bigint,
    type text NOT NULL CHECK (type IN ('full', 'partial')),
    status text NOT NULL CHECK (status IN ('completed', 'failed', 'in_progress')),
    file_path text,
    created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    metadata jsonb,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create storage bucket for backups
INSERT INTO storage.buckets (id, name)
VALUES ('backups', 'backups')
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for backups bucket
CREATE POLICY "Backup files are accessible by admins"
    ON storage.objects FOR SELECT
    TO authenticated
    USING (
        bucket_id = 'backups' AND
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Backup files can be inserted by admins"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'backups' AND
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Backup files can be updated by admins"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
        bucket_id = 'backups' AND
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Backup files can be deleted by admins"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'backups' AND
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Create RLS policies for system_settings
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admin read system_settings" ON system_settings
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Allow admin update system_settings" ON system_settings
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Create RLS policies for backups
ALTER TABLE backups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admin read backups" ON backups
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Allow admin insert backups" ON backups
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Allow admin update backups" ON backups
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Allow admin delete backups" ON backups
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_system_settings_updated_at
    BEFORE UPDATE ON system_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_backups_updated_at
    BEFORE UPDATE ON backups
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default system settings if not exists
INSERT INTO system_settings (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING; 