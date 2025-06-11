-- Set admin role for specific user
INSERT INTO profiles (id, email, name, role)
VALUES ('8158316f-1317-418c-88f7-b50940ec2554', 'niyitegek@gmail.com', 'Admin', 'admin')
ON CONFLICT (id) DO UPDATE
SET role = 'admin'
WHERE profiles.id = '8158316f-1317-418c-88f7-b50940ec2554';

-- Grant necessary permissions
CREATE POLICY "Admins can do everything"
    ON profiles
    FOR ALL
    TO authenticated
    USING (
        auth.uid() IN (
            SELECT id FROM profiles WHERE role = 'admin'
        )
    ); 