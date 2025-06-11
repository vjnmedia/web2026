import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Search, Trash2, Download, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { ImageUpload } from '@/components/ImageUpload';

interface MediaFile {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
    created_at: string;
}

export default function ImageManager() {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    useEffect(() => {
        loadFiles();
    }, []);

    const loadFiles = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase.storage
                .from('images')
                .list('', {
                    sortBy: { column: 'created_at', order: 'desc' }
                });

            if (error) throw error;

            const filesWithUrls = await Promise.all(
                data.map(async (file) => {
                    const { data: { publicUrl } } = supabase.storage
                        .from('images')
                        .getPublicUrl(file.name);

                    return {
                        id: file.id,
                        name: file.name,
                        url: publicUrl,
                        type: file.metadata?.mimetype || 'image/jpeg',
                        size: file.metadata?.size || 0,
                        created_at: file.created_at
                    };
                })
            );

            setFiles(filesWithUrls);
        } catch (error) {
            console.error('Error loading files:', error);
            toast.error(t('errors.media.load'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (file: MediaFile) => {
        if (!confirm(t('confirm.media.delete'))) return;

        try {
            const { error } = await supabase.storage
                .from('images')
                .remove([file.name]);

            if (error) throw error;

            setFiles(files.filter(f => f.id !== file.id));
            toast.success(t('success.media.delete'));
        } catch (error) {
            console.error('Error deleting file:', error);
            toast.error(t('errors.media.delete'));
        }
    };

    const handleDownload = async (file: MediaFile) => {
        try {
            const response = await fetch(file.url);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading file:', error);
            toast.error(t('errors.media.download'));
        }
    };

    const handleImageUpload = async (imageUrl: string, webpUrl: string) => {
        try {
            // Add the new file to the list
            const newFile: MediaFile = {
                id: Math.random().toString(36).substring(7),
                name: imageUrl.split('/').pop() || '',
                url: imageUrl,
                type: 'image/jpeg',
                size: 0,
                created_at: new Date().toISOString()
            };

            setFiles([newFile, ...files]);
            toast.success(t('success.media.upload'));
            setIsUploadDialogOpen(false);
        } catch (error) {
            console.error('Error handling upload:', error);
            toast.error(t('errors.media.upload'));
        }
    };

    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">{t('errors.unauthorized')}</h2>
                    <p className="text-gray-600">{t('errors.unauthorized.message')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex-1 max-w-sm">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder={t('media.search')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                </div>
                <Button
                    onClick={() => setIsUploadDialogOpen(true)}
                    className="bg-vjn-blue hover:bg-vjn-light-blue"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    {t('media.upload')}
                </Button>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vjn-blue" />
                </div>
            ) : filteredFiles.length === 0 ? (
                <div className="text-center py-8">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">{t('media.noFiles')}</h3>
                    <p className="mt-1 text-sm text-gray-500">{t('media.uploadPrompt')}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredFiles.map((file) => (
                        <Card key={file.id} className="overflow-hidden">
                            <div className="aspect-square relative group">
                                <img
                                    src={file.url}
                                    alt={file.name}
                                    className="w-full h-full object-cover cursor-pointer"
                                    onClick={() => {
                                        setSelectedFile(file);
                                        setIsPreviewOpen(true);
                                    }}
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-white opacity-0 group-hover:opacity-100"
                                        onClick={() => handleDownload(file)}
                                    >
                                        <Download className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-white opacity-0 group-hover:opacity-100"
                                        onClick={() => handleDelete(file)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <CardContent className="p-2">
                                <p className="text-sm truncate" title={file.name}>
                                    {file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {new Date(file.created_at).toLocaleDateString()}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{t('media.upload')}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <ImageUpload
                            onImageUpload={handleImageUpload}
                            aspectRatio={1}
                            maxSize={5}
                            className="w-full"
                        />
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>{selectedFile?.name}</DialogTitle>
                    </DialogHeader>
                    {selectedFile && (
                        <div className="space-y-4">
                            <img
                                src={selectedFile.url}
                                alt={selectedFile.name}
                                className="w-full h-auto rounded-lg"
                            />
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-500">
                                    {new Date(selectedFile.created_at).toLocaleString()}
                                </div>
                                <div className="space-x-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => handleDownload(selectedFile)}
                                    >
                                        <Download className="mr-2 h-4 w-4" />
                                        {t('media.download')}
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            handleDelete(selectedFile);
                                            setIsPreviewOpen(false);
                                        }}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        {t('media.delete')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
} 