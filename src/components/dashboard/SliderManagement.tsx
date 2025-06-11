import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';
import { sliderService, type SliderItem } from '@/services/sliderService';
import { useAuth } from '@/hooks/useAuth';
import { ImageUpload } from '@/components/ImageUpload';

export function SliderManagement() {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [sliderItems, setSliderItems] = useState<SliderItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<SliderItem | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        image_webp: '',
        order_index: 0,
        is_active: true,
        language: 'en'
    });

    useEffect(() => {
        if (user) {
            loadSliderItems();
        }
    }, [user]);

    const loadSliderItems = async () => {
        try {
            setIsLoading(true);
            const data = await sliderService.getSliderItems();
            setSliderItems(data);
        } catch (error) {
            console.error('Error loading slider items:', error);
            toast.error(t('errors.slider.load'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateItem = async () => {
        if (!formData.image) {
            toast.error(t('errors.slider.imageRequired'));
            return;
        }

        setIsLoading(true);
        try {
            await sliderService.createSliderItem({
                ...formData,
                order_index: sliderItems.length
            });
            toast.success(t('success.slider.create'));
            loadSliderItems();
            resetForm();
            setIsDialogOpen(false);
        } catch (error) {
            toast.error(t('errors.slider.create'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateItem = async () => {
        if (!selectedItem) return;
        if (!formData.image) {
            toast.error(t('errors.slider.imageRequired'));
            return;
        }

        setIsLoading(true);
        try {
            await sliderService.updateSliderItem(selectedItem.id, formData);
            toast.success(t('success.slider.update'));
            loadSliderItems();
            resetForm();
            setIsDialogOpen(false);
        } catch (error) {
            toast.error(t('errors.slider.update'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteItem = async (id: string) => {
        if (!confirm(t('confirm.slider.delete'))) return;
        try {
            await sliderService.deleteSliderItem(id);
            toast.success(t('success.slider.delete'));
            loadSliderItems();
        } catch (error) {
            toast.error(t('errors.slider.delete'));
        }
    };

    const moveItem = async (index: number, direction: 'up' | 'down') => {
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === sliderItems.length - 1)
        ) {
            return;
        }

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        const items = [...sliderItems];
        const [movedItem] = items.splice(index, 1);
        items.splice(newIndex, 0, movedItem);

        const updatedItems = items.map((item, idx) => ({
            id: item.id,
            order_index: idx
        }));

        try {
            await sliderService.reorderSliderItems(updatedItems);
            setSliderItems(items);
            toast.success(t('success.slider.reorder'));
        } catch (error) {
            toast.error(t('errors.slider.reorder'));
            loadSliderItems(); // Reload on error
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            image: '',
            image_webp: '',
            order_index: 0,
            is_active: true,
            language: 'en'
        });
        setSelectedItem(null);
        setIsEditing(false);
    };

    const handleEdit = (item: SliderItem) => {
        setSelectedItem(item);
        setFormData({
            title: item.title,
            description: item.description,
            image: item.image,
            image_webp: item.image_webp || '',
            order_index: item.order_index,
            is_active: item.is_active,
            language: item.language
        });
        setIsEditing(true);
        setIsDialogOpen(true);
    };

    const handleImageUpload = (imageUrl: string, webpUrl: string) => {
        setFormData(prev => ({
            ...prev,
            image: imageUrl,
            image_webp: webpUrl
        }));
    };

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
                <h2 className="text-2xl font-bold">{t('slider.management')}</h2>
                <Button onClick={() => {
                    resetForm();
                    setIsDialogOpen(true);
                }} className="bg-vjn-blue hover:bg-vjn-light-blue">
                    <Plus className="mr-2 h-4 w-4" />
                    {t('slider.create')}
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('slider.list')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {sliderItems.map((item, index) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between p-4 border rounded-lg bg-white"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="flex flex-col space-y-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => moveItem(index, 'up')}
                                            disabled={index === 0}
                                        >
                                            <ArrowUp className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => moveItem(index, 'down')}
                                            disabled={index === sliderItems.length - 1}
                                        >
                                            <ArrowDown className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="w-24 h-16 relative">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover rounded"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">{item.title}</h4>
                                        <p className="text-sm text-gray-500">
                                            {item.language} - {item.is_active ? t('slider.active') : t('slider.inactive')}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(item)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    {user.role === 'admin' && (
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDeleteItem(item.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {isEditing ? t('slider.edit') : t('slider.create')}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="title">{t('slider.title')}</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder={t('slider.titlePlaceholder')}
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">{t('slider.description')}</Label>
                            <Input
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder={t('slider.descriptionPlaceholder')}
                            />
                        </div>
                        <div>
                            <Label>{t('slider.image')}</Label>
                            <ImageUpload
                                onImageUpload={handleImageUpload}
                                initialImage={formData.image}
                                aspectRatio={16/9}
                                maxSize={5}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <Label htmlFor="language">{t('slider.language')}</Label>
                            <Select
                                value={formData.language}
                                onValueChange={(value) => setFormData({ ...formData, language: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('slider.selectLanguage')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">{t('common.language.en')}</SelectItem>
                                    <SelectItem value="fr">{t('common.language.fr')}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="is_active"
                                checked={formData.is_active}
                                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                            />
                            <Label htmlFor="is_active">{t('slider.active')}</Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            {t('common.cancel')}
                        </Button>
                        <Button
                            onClick={isEditing ? handleUpdateItem : handleCreateItem}
                            disabled={isLoading}
                            className="bg-vjn-blue hover:bg-vjn-light-blue"
                        >
                            {isEditing ? t('common.update') : t('common.create')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
} 