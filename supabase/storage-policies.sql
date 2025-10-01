-- Storage bucket for user-generated assets
-- This should be run in Supabase dashboard or via API

-- Create the 'assets' bucket (public = false for private access)
INSERT INTO storage.buckets (id, name, public)
VALUES ('assets', 'assets', false);

-- Policy: Users can upload to their own folder
CREATE POLICY "Users can upload assets to their own folder"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'assets' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Users can view their own assets
CREATE POLICY "Users can view their own assets"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'assets' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Users can delete their own assets
CREATE POLICY "Users can delete their own assets"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'assets' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
