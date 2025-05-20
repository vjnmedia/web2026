import React, { useState } from 'react';
import { Input, Button } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import DMSBulkActions from './DMSBulkActions';

const DMSDataTable = ({ type, data, onDelete, onUpdate, onAdd }: DMSDataTableProps) => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleBulkUpdate = async (updateData: any) => {
    try {
      const promises = selectedItems.map(item => onUpdate(item.id, updateData));
      await Promise.all(promises);
      toast.success(`Updated ${selectedItems.length} items successfully`);
      setSelectedItems([]);
    } catch (error) {
      console.error('Error updating items:', error);
      toast.error('Failed to update items');
    }
  };

  const handleImport = async (importData: any[]) => {
    try {
      const promises = importData.map(item => onAdd(item));
      await Promise.all(promises);
      toast.success(`Imported ${importData.length} items successfully`);
    } catch (error) {
      console.error('Error importing items:', error);
      toast.error('Failed to import items');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center space-x-2">
          <Button onClick={() => setIsAddDialogOpen(true)}>
            Add {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
          <DMSBulkActions
            selectedItems={selectedItems}
            onDelete={handleDelete}
            onBulkUpdate={handleBulkUpdate}
            onImport={handleImport}
            type={type}
            data={data}
          />
        </div>
      </div>

      {/* ... rest of the existing code ... */}
    </div>
  );
};

export default DMSDataTable; 