-- Drop profiles table if it exists
DROP TABLE IF EXISTS profiles CASCADE;

-- Rename users table to profiles
ALTER TABLE users RENAME TO profiles;

-- Update foreign key references in user_preferences
ALTER TABLE user_preferences 
  DROP CONSTRAINT user_preferences_user_id_fkey,
  ADD CONSTRAINT user_preferences_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES profiles(id) 
  ON DELETE CASCADE;

-- Rename indexes
ALTER INDEX idx_users_email RENAME TO idx_profiles_email;
ALTER INDEX idx_users_role RENAME TO idx_profiles_role;

-- Rename trigger
ALTER TRIGGER update_users_updated_at ON profiles RENAME TO update_profiles_updated_at;

-- Update RLS policies
DROP POLICY IF EXISTS "Users are viewable by authenticated users" ON profiles;
DROP POLICY IF EXISTS "Users can be created by authenticated users" ON profiles;
DROP POLICY IF EXISTS "Users can be updated by themselves or admins" ON profiles;
DROP POLICY IF EXISTS "Users can be deleted by admins" ON profiles;

CREATE POLICY "Profiles are viewable by authenticated users" ON profiles
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Profiles can be created by authenticated users" ON profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Profiles can be updated by themselves or admins" ON profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id OR EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    ));

CREATE POLICY "Profiles can be deleted by admins" ON profiles
    FOR DELETE
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )); 