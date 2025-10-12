import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, ArrowUp, ArrowDown, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { sliderService, type SliderItem } from '@/services/sliderService';
import { useAuth } from '@/hooks/useAuth';

export const SliderManagement = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [sliderItems, setSliderItems] = useState<SliderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SliderItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    order_index: 0,
    is_active: true,
    language: 'en' as 'en' | 'fr',
  });

  useEffect(() => {
    loadSliders();
  }, []);

  const loadSliders = async () => {
    try {
      setIsLoading(true);
      const data = await sliderService.getSliders();
      setSliderItems(data);
    } catch (error) {
      console.error('Error loading sliders:', error);
      toast.error('Failed to load slider items');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSaving(true);
      
      if (selectedItem) {
        // Update existing item
        await sliderService.updateSlider(selectedItem.id, {
          ...formData,
          updated_by: user?.id
        });
        toast.success('Slider item updated successfully');
      } else {
        // Create new item
        const newOrderIndex = Math.max(...sliderItems.map(item => item.order_index), 0) + 1;
        await sliderService.createSlider({
          ...formData,
          order_index: newOrderIndex,
          created_by: user?.id,
          updated_by: user?.id
        });
        toast.success('Slider item created successfully');
      }
      
      await loadSliders();
      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving slider:', error);
      toast.error('Failed to save slider item');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (item: SliderItem) => {
    setSelectedItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image,
      order_index: item.order_index,
      is_active: item.is_active,
      language: item.language,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await sliderService.deleteSlider(id);
      toast.success('Slider item deleted successfully');
      await loadSliders();
      setIsDeleteDialogOpen(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Error deleting slider:', error);
      toast.error('Failed to delete slider item');
    }
  };

  const toggleActive = async (id: string) => {
    try {
      const item = sliderItems.find(item => item.id === id);
      if (!item) return;
      
      await sliderService.updateSlider(id, {
        is_active: !item.is_active,
        updated_by: user?.id
      });
      
      toast.success('Slider item status updated');
      await loadSliders();
    } catch (error) {
      console.error('Error updating slider status:', error);
      toast.error('Failed to update slider item status');
    }
  };

  const moveItem = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = sliderItems.findIndex(item => item.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= sliderItems.length) return;

    const newItems = [...sliderItems];
    [newItems[currentIndex], newItems[newIndex]] = [newItems[newIndex], newItems[currentIndex]];
    
    // Update order values
    const orderUpdates = newItems.map((item, index) => ({
      id: item.id,
      order_index: index + 1
    }));

    try {
      await sliderService.updateSliderOrder(orderUpdates);
      toast.success('Slider order updated');
      await loadSliders();
    } catch (error) {
      console.error('Error updating slider order:', error);
      toast.error('Failed to update slider order');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      order_index: 0,
      is_active: true,
      language: 'en',
    });
    setSelectedItem(null);
  };

  const sortedItems = [...sliderItems].sort((a, b) => a.order_index - b.order_index);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Slider Management</h3>
          <p className="text-sm text-gray-600">Manage homepage slider content and images</p>
        </div>
        <Button 
          onClick={() => { resetForm(); setIsDialogOpen(true); }}
          className="bg-vjn-blue hover:bg-vjn-light-blue"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Slider Item
        </Button>
      </div>

      <div className="grid gap-4">
        {sortedItems.map((item, index) => (
          <Card key={item.id} className={`${!item.is_active ? 'opacity-60' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-16 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant={item.is_active ? 'default' : 'secondary'}>
                          {item.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Badge variant="outline">{item.language.toUpperCase()}</Badge>
                        <span className="text-xs text-gray-500">Order: {item.order_index}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveItem(item.id, 'up')}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveItem(item.id, 'down')}
                        disabled={index === sortedItems.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleActive(item.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedItem(item);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedItems.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No slider items</h3>
              <p className="text-gray-600 mb-4">Get started by creating your first slider item.</p>
              <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Slider Item
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedItem ? 'Edit Slider Item' : 'Add New Slider Item'}
            </DialogTitle>
            <DialogDescription>
              {selectedItem ? 'Update the slider item details' : 'Create a new slider item for the homepage'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="language">Language</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value: 'en' | 'fr') => setFormData({ ...formData, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div>
              <ImageUpload
                onImageUpload={(url) => setFormData({ ...formData, image: url })}
                initialImage={formData.image}
                label="Slider Image"
                description="Upload an image for the slider (recommended: 1200x600px)"
                aspectRatio={2}
                maxSize={5}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-vjn-blue hover:bg-vjn-light-blue"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : (selectedItem ? 'Update' : 'Create')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Slider Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedItem?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedItem && handleDelete(selectedItem.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
