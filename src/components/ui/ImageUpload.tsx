import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { imageUploadService } from '@/services/imageUploadService';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  initialImage?: string;
  bucketName?: string;
  label?: string;
  description?: string;
  aspectRatio?: number;
  maxSize?: number; // in MB
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  initialImage,
  bucketName = 'slider',
  label = 'Upload Image',
  description = 'Click or drag and drop to upload an image',
  aspectRatio = 16 / 9,
  maxSize = 5,
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

      // Upload to Supabase
      const result = await imageUploadService.uploadImage(file, bucketName);
      
      // Update preview with actual URL
      setPreview(result.url);
      onImageUpload(result.url);
      
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  }, [bucketName, onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false,
    maxSize: maxSize * 1024 * 1024,
  });

  const removeImage = () => {
    setPreview(null);
    onImageUpload('');
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      {description && (
        <p className="text-xs text-gray-500">
          {description}
        </p>
      )}

      {preview ? (
        <Card className="relative">
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
                style={{ aspectRatio }}
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={removeImage}
                disabled={isUploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card
          {...getRootProps()}
          className={`cursor-pointer transition-colors ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300 hover:border-gray-400'
          }`}
        >
          <CardContent className="flex flex-col items-center justify-center py-8">
            <input {...getInputProps()} />
            {isUploading ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-sm text-gray-600">Uploading...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 bg-gray-100 rounded-full">
                  {isDragActive ? (
                    <Upload className="h-6 w-6 text-blue-600" />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-gray-600" />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">
                    {isDragActive ? 'Drop the image here' : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF up to {maxSize}MB
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
