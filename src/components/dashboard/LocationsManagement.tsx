
import { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, MapPin } from 'lucide-react';

// Mock data for locations
const mockLocations = [
  { 
    id: 1, 
    name: "VJN Headquarters", 
    address: "KK 15 Ave, Kigali", 
    type: "Main Office",
    services: "All Programs", 
    coordinates: { lat: -1.9536, lng: 30.0606 }
  },
  { 
    id: 2, 
    name: "Nyamirambo Center", 
    address: "Nyamirambo, Kigali", 
    type: "Community Center",
    services: "Education, Arts, Peace", 
    coordinates: { lat: -1.9865, lng: 30.0401 }
  },
  { 
    id: 3, 
    name: "Rubavu Youth Hub", 
    address: "Gisenyi, Rubavu", 
    type: "Regional Office",
    services: "Economic, Health", 
    coordinates: { lat: -1.6698, lng: 29.2576 }
  },
  { 
    id: 4, 
    name: "Huye Training Center", 
    address: "Huye, Southern Province", 
    type: "Training Facility",
    services: "Education, Economic", 
    coordinates: { lat: -2.6077, lng: 29.7477 }
  },
];

const LocationsManagement = () => {
  const { t } = useLanguage();
  const [locations, setLocations] = useState(mockLocations);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = locations.filter(location => 
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.services.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddLocation = () => {
    console.log("Add new location");
  };

  const handleViewLocation = (id: number) => {
    console.log("View location with id:", id);
  };

  const handleEditLocation = (id: number) => {
    console.log("Edit location with id:", id);
  };

  const handleDeleteLocation = (id: number) => {
    console.log("Delete location with id:", id);
    setLocations(locations.filter(location => location.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{t('dashboard.locationsManagement')}</h2>
        <Button onClick={handleAddLocation} className="bg-vjn-blue hover:bg-vjn-light-blue">
          <Plus className="mr-2 h-4 w-4" />
          {t('dashboard.addLocation')}
        </Button>
      </div>
      
      <div className="flex items-center">
        <Input
          placeholder={t('dashboard.searchLocations')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('dashboard.locationName')}</TableHead>
              <TableHead>{t('dashboard.address')}</TableHead>
              <TableHead>{t('dashboard.type')}</TableHead>
              <TableHead>{t('dashboard.services')}</TableHead>
              <TableHead className="text-right">{t('dashboard.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLocations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  {t('dashboard.noLocations')}
                </TableCell>
              </TableRow>
            ) : (
              filteredLocations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell className="font-medium">{location.name}</TableCell>
                  <TableCell>{location.address}</TableCell>
                  <TableCell>{location.type}</TableCell>
                  <TableCell>{location.services}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewLocation(location.id)}>
                      <MapPin className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEditLocation(location.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteLocation(location.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">{t('dashboard.locationMap')}</h3>
        <div className="border rounded-lg overflow-hidden h-96 bg-gray-100 flex items-center justify-center">
          <div className="text-center p-6">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-vjn-blue" />
            <p className="text-lg font-medium">{t('dashboard.mapPlaceholder')}</p>
            <p className="text-sm text-gray-500">{t('dashboard.mapIntegration')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsManagement;
