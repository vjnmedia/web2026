import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Edit, 
  Trash2, 
  PlusCircle, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Eye, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Users,
  Building,
  Crown,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { supabaseStaffService } from '@/services/supabaseStaffService';
import { useStaff, StaffMember } from '@/contexts/StaffContext';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface AddEditStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    displayName: string;
    firstName: string;
    lastName: string;
    position: string;
    department: string;
    phone: string;
    email: string;
    imageUrl: string;
    isSeniorManagement: boolean;
    bio?: string;
    startDate?: string;
    location?: string;
  };
  onInputChange: (field: string, value: any) => void;
  onSave: () => void;
  isEditing: boolean;
  initialImageUrl?: string;
  allDepartments: string[];
  allPositions: string[];
}

const AddEditStaffModal: React.FC<AddEditStaffModalProps> = ({
  isOpen,
  onClose,
  formData,
  onInputChange,
  onSave,
  isEditing,
  initialImageUrl,
  allDepartments,
  allPositions
}) => {
  const { t } = useTranslation();

  const handleImageUpload = (imageUrl: string) => {
    onInputChange('imageUrl', imageUrl);
  };

  const isFormValid = () => {
    return formData.firstName.trim() && 
           formData.lastName.trim() && 
           formData.position.trim() && 
           formData.email.trim() &&
           formData.email.includes('@');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isEditing ? 'Edit Staff Member' : 'Add New Staff Member'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Left Column - Basic Info */}
          <div className="space-y-4">
            <div className="text-lg font-semibold text-gray-900 mb-4">Basic Information</div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input 
                  id="firstName" 
                  value={formData.firstName} 
                  onChange={(e) => onInputChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input 
                  id="lastName" 
                  value={formData.lastName} 
                  onChange={(e) => onInputChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="displayName">Display Name</Label>
              <Input 
                id="displayName" 
                value={formData.displayName} 
                onChange={(e) => onInputChange('displayName', e.target.value)}
                placeholder="How this person should be displayed"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input 
                id="email" 
                type="email"
                value={formData.email} 
                onChange={(e) => onInputChange('email', e.target.value)}
                placeholder="Enter email address"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={formData.phone} 
                onChange={(e) => onInputChange('phone', e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <Label htmlFor="position">Position *</Label>
              <Select 
                value={formData.position} 
                onValueChange={(value) => onInputChange('position', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a position" />
                </SelectTrigger>
                <SelectContent>
                  {allPositions.map(position => (
                    <SelectItem key={position} value={position}>{position}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="department">Department</Label>
              <Select 
                value={formData.department} 
                onValueChange={(value) => onInputChange('department', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  {allDepartments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right Column - Additional Info & Image */}
          <div className="space-y-4">
            <div className="text-lg font-semibold text-gray-900 mb-4">Additional Information</div>
            
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input 
                id="startDate" 
                type="date"
                value={formData.startDate} 
                onChange={(e) => onInputChange('startDate', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                value={formData.location} 
                onChange={(e) => onInputChange('location', e.target.value)}
                placeholder="Enter work location"
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio" 
                value={formData.bio} 
                onChange={(e) => onInputChange('bio', e.target.value)}
                placeholder="Brief description of the staff member"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isSeniorManagement"
                checked={formData.isSeniorManagement}
                onCheckedChange={(checked) => onInputChange('isSeniorManagement', checked)}
              />
              <Label htmlFor="isSeniorManagement">Senior Management</Label>
            </div>

            <div>
              <ImageUpload
                onImageUpload={handleImageUpload}
                initialImage={initialImageUrl}
                label="Profile Photo"
                description="Upload a professional photo"
                aspectRatio={1}
                maxSize={2}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={onSave} 
            disabled={!isFormValid()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isEditing ? 'Update Staff Member' : 'Add Staff Member'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const StaffManagement = () => {
  const { t } = useTranslation();
  const { staff, loading, error, addStaff, updateStaff, deleteStaff, fetchStaff, allDepartments, seniorManagementTitles } = useStaff();
  
  // State management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<StaffMember | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [positionFilter, setPositionFilter] = useState('all');
  const [seniorManagementFilter, setSeniorManagementFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
  
  const [formData, setFormData] = useState({
    displayName: '',
    firstName: '',
    lastName: '',
    position: '',
    department: '',
    phone: '',
    email: '',
    imageUrl: '',
    isSeniorManagement: false,
    bio: '',
    startDate: '',
    location: ''
  });

  // Get all unique positions from staff data
  const allPositions = useMemo(() => {
    const positions = new Set(staff.map(member => member.position).filter(Boolean));
    return Array.from(positions).sort();
  }, [staff]);

  // Filter and sort staff
  const filteredAndSortedStaff = useMemo(() => {
    let filtered = staff.filter(member => {
      const matchesSearch = 
        member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.position.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
      const matchesPosition = positionFilter === 'all' || member.position === positionFilter;
      const matchesSeniorManagement = 
        seniorManagementFilter === 'all' || 
        (seniorManagementFilter === 'senior' && member.isSeniorManagement) ||
        (seniorManagementFilter === 'regular' && !member.isSeniorManagement);

      return matchesSearch && matchesDepartment && matchesPosition && matchesSeniorManagement;
    });

    // Sort: Senior management first, then by department, then by name
    return filtered.sort((a, b) => {
      if (a.isSeniorManagement && !b.isSeniorManagement) return -1;
      if (!a.isSeniorManagement && b.isSeniorManagement) return 1;
      
      if (a.department && b.department && a.department !== b.department) {
        return a.department.localeCompare(b.department);
      }
      
      return a.firstName.localeCompare(b.firstName);
    });
  }, [staff, searchTerm, departmentFilter, positionFilter, seniorManagementFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = staff.length;
    const senior = staff.filter(m => m.isSeniorManagement).length;
    const departments = new Set(staff.map(m => m.department).filter(Boolean)).size;
    const withPhotos = staff.filter(m => m.imageUrl).length;
    
    return { total, senior, departments, withPhotos };
  }, [staff]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddStaff = () => {
    setEditingStaff(null);
    setFormData({
      displayName: '',
      firstName: '',
      lastName: '',
      position: '',
      department: '',
      phone: '',
      email: '',
      imageUrl: '',
      isSeniorManagement: false,
      bio: '',
      startDate: '',
      location: ''
    });
    setIsModalOpen(true);
  };

  const handleEditStaff = (staffMember: StaffMember) => {
    setEditingStaff(staffMember);
    setFormData({
      displayName: staffMember.displayName || '',
      firstName: staffMember.firstName || '',
      lastName: staffMember.lastName || '',
      position: staffMember.position || '',
      department: staffMember.department || '',
      phone: staffMember.phone || '',
      email: staffMember.email || '',
      imageUrl: staffMember.imageUrl || '',
      isSeniorManagement: staffMember.isSeniorManagement || false,
      bio: '',
      startDate: '',
      location: ''
    });
    setIsModalOpen(true);
  };

  const handleDeleteStaff = (staffMember: StaffMember) => {
    setStaffToDelete(staffMember);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (staffToDelete) {
      try {
        await deleteStaff(staffToDelete.id);
        toast.success('Staff member deleted successfully');
        setDeleteDialogOpen(false);
        setStaffToDelete(null);
      } catch (error) {
        toast.error('Failed to delete staff member');
      }
    }
  };

  const handleSaveStaff = async () => {
    try {
      if (editingStaff) {
        await updateStaff(editingStaff.id, formData);
        toast.success('Staff member updated successfully');
      } else {
        await addStaff(formData);
        toast.success('Staff member added successfully');
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to save staff member');
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Name', 'Email', 'Position', 'Department', 'Phone', 'Senior Management'],
      ...filteredAndSortedStaff.map(member => [
        `${member.firstName} ${member.lastName}`,
        member.email || '',
        member.position || '',
        member.department || '',
        member.phone || '',
        member.isSeniorManagement ? 'Yes' : 'No'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'staff-directory.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Staff directory exported successfully');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading staff directory...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Staff</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={fetchStaff} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-1">Manage your organization's staff directory</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={exportToCSV} disabled={staff.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={handleAddStaff} className="bg-blue-600 hover:bg-blue-700">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Staff Member
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Senior Management</p>
                <p className="text-2xl font-bold text-gray-900">{stats.senior}</p>
              </div>
              <Crown className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.departments}</p>
              </div>
              <Building className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">With Photos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.withPhotos}</p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search staff members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {allDepartments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  {allPositions.map(position => (
                    <SelectItem key={position} value={position}>{position}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={seniorManagementFilter} onValueChange={setSeniorManagementFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="senior">Senior Management</SelectItem>
                  <SelectItem value="regular">Regular Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff Directory */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedStaff.map((member) => (
            <Card key={member.id} className={`${member.isSeniorManagement ? 'border-yellow-200 bg-yellow-50/30' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage 
                        src={member.imageUrl} 
                        alt={`${member.firstName} ${member.lastName}`}
                        onError={(e) => {
                          // Hide the image if it fails to load
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                        {member.firstName?.charAt(0)?.toUpperCase()}{member.lastName?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {member.displayName || `${member.firstName} ${member.lastName}`}
                      </h3>
                      <p className="text-sm text-gray-600">{member.position}</p>
                      {member.isSeniorManagement && (
                        <Badge variant="secondary" className="mt-1">
                          <Crown className="h-3 w-3 mr-1" />
                          Senior Management
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditStaff(member)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteStaff(member)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {member.email && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {member.email}
                    </div>
                  )}
                  {member.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {member.phone}
                    </div>
                  )}
                  {member.department && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Building className="h-4 w-4 mr-2" />
                      {member.department}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedStaff.map((member) => (
                  <TableRow key={member.id} className={member.isSeniorManagement ? 'bg-yellow-50/30' : ''}>
                    <TableCell>
                      <Avatar className="h-8 w-8">
                        <AvatarImage 
                          src={member.imageUrl} 
                          alt={`${member.firstName} ${member.lastName}`}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-xs">
                          {member.firstName?.charAt(0)?.toUpperCase()}{member.lastName?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">
                      {member.displayName || `${member.firstName} ${member.lastName}`}
                    </TableCell>
                    <TableCell>{member.position}</TableCell>
                    <TableCell>{member.department}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.phone}</TableCell>
                    <TableCell>
                      {member.isSeniorManagement ? (
                        <Badge variant="secondary">
                          <Crown className="h-3 w-3 mr-1" />
                          Senior
                        </Badge>
                      ) : (
                        <Badge variant="outline">Regular</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditStaff(member)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteStaff(member)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {filteredAndSortedStaff.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No staff members found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or add a new staff member.</p>
            <Button onClick={handleAddStaff}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Staff Member
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <AddEditStaffModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        onInputChange={handleInputChange}
        onSave={handleSaveStaff}
        isEditing={editingStaff !== null}
        initialImageUrl={editingStaff?.imageUrl}
        allDepartments={allDepartments}
        allPositions={allPositions}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Staff Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{staffToDelete?.displayName || `${staffToDelete?.firstName} ${staffToDelete?.lastName}`}</strong>? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
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

export default StaffManagement;