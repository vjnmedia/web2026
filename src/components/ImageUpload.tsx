import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface ImageUploadProps {
    onImageUpload: (imageUrl: string, webpUrl: string) => void;
    initialImage?: string;
    aspectRatio?: number;
    maxSize?: number; // in MB
    className?: string;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    required?: boolean;
    label?: string;
    description?: string;
    error?: string;
    bucketName?: string;
}

export function ImageUpload({
    onImageUpload,
    initialImage,
    aspectRatio = 16/9,
    maxSize = 5,
    className,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    required = false,
    label = 'Upload Image',
    description,
    error,
    bucketName = 'slider'
}: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(initialImage || null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [validationError, setValidationError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setPreview(initialImage || null);
        
        // Test Supabase connection and bucket
        const testSupabaseConnection = async () => {
            try {
                console.log('ImageUpload: Testing Supabase connection...');
                const { data, error } = await supabase.storage.from(bucketName).list('', { limit: 1 });
                if (error) {
                    console.error('ImageUpload: Supabase bucket test failed:', error);
                } else {
                    console.log('ImageUpload: Supabase bucket test successful:', data);
                }
            } catch (err) {
                console.error('ImageUpload: Supabase connection test error:', err);
            }
        };
        
        testSupabaseConnection();
    }, [initialImage, bucketName]);

    const validateImage = async (file: File): Promise<boolean> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            
            img.onload = () => {
                const isValid = (
                    (!minWidth || img.width >= minWidth) &&
                    (!minHeight || img.height >= minHeight) &&
                    (!maxWidth || img.width <= maxWidth) &&
                    (!maxHeight || img.height <= maxHeight)
                );

                if (!isValid) {
                    const errors = [];
                    if (minWidth && img.width < minWidth) errors.push(`width must be at least ${minWidth}px`);
                    if (minHeight && img.height < minHeight) errors.push(`height must be at least ${minHeight}px`);
                    if (maxWidth && img.width > maxWidth) errors.push(`width must be at most ${maxWidth}px`);
                    if (maxHeight && img.height > maxHeight) errors.push(`height must be at most ${maxHeight}px`);
                    
                    setValidationError(`Invalid image dimensions: ${errors.join(', ')}`);
                    resolve(false);
                } else {
                    setValidationError(null);
                    resolve(true);
                }
            };

            img.onerror = () => {
                setValidationError('Failed to load image');
                resolve(false);
            };
        });
    };

    const optimizeImage = async (file: File): Promise<Blob> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Calculate new dimensions while maintaining aspect ratio
                if (maxWidth && width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                if (maxHeight && height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    if (blob) resolve(blob);
                }, 'image/jpeg', 0.8);
            };
        });
    };

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        console.log('ImageUpload: File selected:', file.name, file.size, file.type);

        // Reset states
        setValidationError(null);
        setUploadProgress(0);

        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
            setValidationError(`File size must be less than ${maxSize}MB`);
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setValidationError('File must be an image');
            return;
        }

        // Validate dimensions
        const isValid = await validateImage(file);
        if (!isValid) return;

        setIsUploading(true);

        try {
            console.log('ImageUpload: Starting upload process...');
            console.log('ImageUpload: Supabase URL:', supabase.supabaseUrl);
            console.log('ImageUpload: Bucket name:', bucketName);
            // Optimize image before upload
            const optimizedBlob = await optimizeImage(file);
            const optimizedFile = new File([optimizedBlob], file.name, { type: 'image/jpeg' });

            // Create a unique filename
            const fileExt = 'jpg';
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${bucketName}/${fileName}`;

            // Upload original image with progress tracking
            console.log('ImageUpload: Uploading to path:', filePath);
            const { error: uploadError, data } = await supabase.storage
                .from(bucketName)
                .upload(filePath, optimizedFile, {
                    onUploadProgress: (progress) => {
                        setUploadProgress((progress.loaded / progress.total) * 100);
                    }
                });

            console.log('ImageUpload: Upload result:', { uploadError, data });
            if (uploadError) {
                console.error('ImageUpload: Upload error:', uploadError);
                throw uploadError;
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from(bucketName)
                .getPublicUrl(filePath);

            // Create WebP version
            const webpFileName = `${fileName.split('.')[0]}.webp`;
            const webpFilePath = `${bucketName}/${webpFileName}`;

            // Convert to WebP
            const img = new Image();
            img.src = URL.createObjectURL(optimizedFile);
            await new Promise((resolve) => {
                img.onload = resolve;
            });

            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);

            const webpBlob = await new Promise<Blob>((resolve) => {
                canvas.toBlob((blob) => {
                    if (blob) resolve(blob);
                }, 'image/webp', 0.8);
            });

            // Upload WebP version
            const { error: webpUploadError } = await supabase.storage
                .from(bucketName)
                .upload(webpFilePath, webpBlob);

            if (webpUploadError) throw webpUploadError;

            // Get WebP public URL
            const { data: { publicUrl: webpUrl } } = supabase.storage
                .from(bucketName)
                .getPublicUrl(webpFilePath);

            setPreview(publicUrl);
            onImageUpload(publicUrl, webpUrl);
            toast.success('Image uploaded successfully!');
        } catch (error) {
            console.error('ImageUpload: Error uploading image:', error);
            console.error('ImageUpload: Error details:', {
                message: error.message,
                status: error.status,
                statusText: error.statusText,
                error: error.error
            });
            toast.error(`Image upload failed: ${error.message || 'Unknown error'}`);
        } finally {
            setIsUploading(false);
        }
    }, [maxSize, minWidth, minHeight, maxWidth, maxHeight, onImageUpload, bucketName]);

    const { getRootProps, getInputProps, isDragActive, isFocused, isFileDialogActive, open } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.gif', '.webp'] },
        multiple: false,
        noClick: false, // Changed from true to false to allow clicking
    });

    const removeImage = () => {
        setPreview(null);
        onImageUpload('', '');
        setValidationError(null);
    };

    const displayErrors = validationError || error;

    return (
        <div className={cn("space-y-2", className)}>
            {label && <Label>{label}{required && <span className="text-red-500">*</span>}</Label>}
            {description && <p className="text-sm text-gray-500">{description}</p>}

            {preview ? (
                <div className="relative w-full h-48 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
                    <img src={preview} alt="Preview" className="object-contain h-full w-full" />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full"
                        onClick={removeImage}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className={cn(
                        "flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md cursor-pointer",
                        "transition-colors duration-200",
                        isDragActive || isFocused || isFileDialogActive ? "border-vjn-blue bg-blue-50" : "border-gray-300 hover:border-gray-400",
                        displayErrors ? "border-red-500" : ""
                    )}
                >
                    <input {...getInputProps()} ref={fileInputRef} />
                    {isUploading ? (
                        <div className="flex flex-col items-center w-full">
                            <Upload className="h-8 w-8 text-vjn-blue mb-2 animate-bounce" />
                            <p className="text-sm text-vjn-blue">Uploading... {Math.round(uploadProgress)}%</p>
                            <Progress value={uploadProgress} className="w-full mt-2" />
                        </div>
                    ) : (
                        <>
                            <Upload className="h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600 mb-1">Drag 'n' drop an image here, or click to select one</p>
                            <p className="text-xs text-gray-500">Max size: {maxSize}MB</p>
                        </>
                    )}
                </div>
            )}

            {displayErrors && (
                <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {displayErrors}
                </p>
            )}
        </div>
    );
} 