# Fix Slider Issues

## Issues Fixed:

### 1. Image Upload Failing
**Problem**: Image uploads were failing with "Bucket not found" error
**Solution**: 
- Updated `ImageUpload` component default bucket from 'uploads' to 'slider'
- Updated `imageUploadService` to use correct bucket names
- Fixed folder structure for different bucket types

### 2. Hero Component Method Error
**Problem**: Console error showing `sliderService.getSliderItems is not a function`
**Solution**: 
- Fixed method call in Hero component (already done)
- Fixed `fetchPriority` prop warning by changing to `fetchpriority`

## How to Apply the Fixes:

### Option 1: Hard Refresh Browser (Recommended)
1. Open your browser's developer tools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"
4. Or use Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)

### Option 2: Clear Browser Cache
1. Go to browser settings
2. Clear browsing data
3. Select "Cached images and files"
4. Clear data

### Option 3: Restart Development Server
```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
# or
yarn dev
```

## Test the Fixes:

1. **Test Image Upload**:
   - Go to Admin Settings → Slider Management
   - Try editing an existing slider
   - Upload a new image
   - Should work without "Bucket not found" error

2. **Test Slider Display**:
   - Go to homepage
   - Check browser console for errors
   - Slider should display multiple images and cycle automatically

## Available Storage Buckets:

- `slider` - For slider images
- `events` - For event images  
- `profiles` - For user profile images
- `backups` - For backup files

## If Issues Persist:

1. Check browser console for any remaining errors
2. Verify Supabase connection is working
3. Check if storage buckets exist in your Supabase dashboard
4. Try uploading images through the admin interface

The fixes should resolve both the image upload issue and the slider display problems.
