import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { imageUploadService } from '@/services/imageUploadService';

interface EventImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  initialImage?: string;
  label?: string;
  description?: string;
  className?: string;
}

export const EventImageUpload: React.FC<EventImageUploadProps> = ({
  onImageUpload,
  initialImage,
  label = 'Event Thumbnail',
  description = 'Upload a thumbnail image for your event (recommended: 16:9 aspect ratio)',
  className = '',
}) => {
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file
    const validation = imageUploadService.validateImageFile(file);
    if (!validation.valid) {
      toast.error(validation.error || 'Invalid file');
      return;
    }

    try {
      setIsUploading(true);
      
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Upload to Supabase events bucket
      const result = await imageUploadService.uploadImage(file, 'events');
      
      // Update preview with actual URL
      setPreview(result.url);
      onImageUpload(result.url);
      
      toast.success('Event image uploaded successfully');
    } catch (error) {
      console.error('Error uploading event image:', error);
      toast.error('Failed to upload event image');
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const removeImage = () => {
    setPreview(null);
    onImageUpload('');
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
          <Camera className="h-4 w-4" />
          <span>{label}</span>
        </label>
      )}
      
      {description && (
        <p className="text-xs text-gray-500">
          {description}
        </p>
      )}

      {preview ? (
        <Card className="relative overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={preview}
                alt="Event thumbnail preview"
                className="w-full h-48 object-cover"
                style={{ aspectRatio: '16/9' }}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={removeImage}
                  disabled={isUploading}
                  className="opacity-90"
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="bg-white rounded-lg p-4 flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm text-gray-700">Uploading...</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card
          {...getRootProps()}
          className={`cursor-pointer transition-all duration-200 ${
            isDragActive 
              ? 'border-blue-500 bg-blue-50 scale-105' 
              : 'border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          <CardContent className="flex flex-col items-center justify-center py-12">
            <input {...getInputProps()} />
            {isUploading ? (
              <div className="flex flex-col items-center space-y-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-sm text-gray-600">Uploading image...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full">
                  {isDragActive ? (
                    <Upload className="h-8 w-8 text-blue-600" />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-blue-600" />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">
                    {isDragActive ? 'Drop the image here' : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF, WebP up to 5MB
                  </p>
                  <p className="text-xs text-blue-600 mt-1 font-medium">
                    Recommended: 16:9 aspect ratio (1920x1080px)
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
