import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export interface StaffMember {
  id: number;
  displayName: string;
  firstName: string;
  lastName: string;
  position: string;
  department?: string;
  phone?: string;
  email?: string;
  imageUrl?: string;
  isSeniorManagement?: boolean;
}

interface StaffContextType {
  staff: StaffMember[];
  isLoading: boolean;
  error: string | null;
  addStaff: (newStaff: Omit<StaffMember, 'id' | 'isSeniorManagement'>) => Promise<void>;
  updateStaff: (id: number, updatedFields: Partial<Omit<StaffMember, 'id' | 'isSeniorManagement'>>) => Promise<void>;
  deleteStaff: (id: number) => Promise<void>;
  seniorManagementTitles: string[];
  allDepartments: string[];
}

const StaffContext = createContext<StaffContextType | undefined>(undefined);

const seniorManagementTitles = [
  'Executive director',
  'Coordinator of Administration and Finance Services',
  'Programs Coordinator',
  'National coordinator/EU',
  'Human Resource Officer',
  'Dean of Studies',
  'Accountant/MISEREOR',
  'Project coordinator/Interpeace',
  'Digital Transformation Officer/Y4Y',
  'LA MENNAIS DIRECTOR'
];

export const StaffProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStaff = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('staff')
        .select('id, display_name, first_name, last_name, position, department, phone, email, image_url');

      if (fetchError) throw fetchError;

      const formattedStaff: StaffMember[] = data.map(s => ({
        id: s.id,
        displayName: s.display_name,
        firstName: s.first_name,
        lastName: s.last_name,
        position: s.position,
        department: s.department,
        phone: s.phone,
        email: s.email,
        imageUrl: s.image_url,
        isSeniorManagement: seniorManagementTitles.includes(s.position.trim()),
      }));

      setStaff(formattedStaff);
    } catch (err: any) {
      console.error('Error fetching staff:', err.message);
      setError('Failed to load staff data: ' + err.message);
      toast.error('Failed to load staff data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const addStaff = async (newStaff: Omit<StaffMember, 'id' | 'isSeniorManagement'>) => {
    setError(null);
    try {
      const { data, error: insertError } = await supabase
        .from('staff')
        .insert({
          display_name: newStaff.displayName,
          first_name: newStaff.firstName,
          last_name: newStaff.lastName,
          position: newStaff.position,
          department: newStaff.department,
          phone: newStaff.phone,
          email: newStaff.email,
          image_url: newStaff.imageUrl,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      const addedStaff: StaffMember = {
        id: data.id,
        displayName: data.display_name,
        firstName: data.first_name,
        lastName: data.last_name,
        position: data.position,
        department: data.department,
        phone: data.phone,
        email: data.email,
        imageUrl: data.image_url,
        isSeniorManagement: seniorManagementTitles.includes(data.position.trim()),
      };
      setStaff(prev => [...prev, addedStaff]);
      toast.success('Staff member added successfully!');
    } catch (err: any) {
      console.error('Error adding staff:', err.message);
      setError('Failed to add staff member: ' + err.message);
      toast.error('Failed to add staff member.');
    }
  };

  const updateStaff = async (id: number, updatedFields: Partial<Omit<StaffMember, 'id' | 'isSeniorManagement'>>) => {
    setError(null);
    try {
      const { data, error: updateError } = await supabase
        .from('staff')
        .update({
          display_name: updatedFields.displayName,
          first_name: updatedFields.firstName,
          last_name: updatedFields.lastName,
          position: updatedFields.position,
          department: updatedFields.department,
          phone: updatedFields.phone,
          email: updatedFields.email,
          image_url: updatedFields.imageUrl,
        })
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;

      const updatedStaffMember: StaffMember = {
        id: data.id,
        displayName: data.display_name,
        firstName: data.first_name,
        lastName: data.last_name,
        position: data.position,
        department: data.department,
        phone: data.phone,
        email: data.email,
        imageUrl: data.image_url,
        isSeniorManagement: seniorManagementTitles.includes(data.position.trim()),
      };

      setStaff(prev => prev.map(s => (s.id === id ? updatedStaffMember : s)));
      toast.success('Staff member updated successfully!');
    } catch (err: any) {
      console.error('Error updating staff:', err.message);
      setError('Failed to update staff member: ' + err.message);
      toast.error('Failed to update staff member.');
    }
  };

  const deleteStaff = async (id: number) => {
    setError(null);
    try {
      const { error: deleteError } = await supabase
        .from('staff')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      setStaff(prev => prev.filter(s => s.id !== id));
      toast.success('Staff member deleted successfully!');
    } catch (err: any) {
      console.error('Error deleting staff:', err.message);
      setError('Failed to delete staff member: ' + err.message);
      toast.error('Failed to delete staff member.');
    }
  };

  const allDepartments = useMemo(() => {
    const departments = new Set<string>();
    staff.forEach(s => {
      if (s.department && s.department.trim() !== '') {
        departments.add(s.department.trim());
      }
    });
    return Array.from(departments).sort();
  }, [staff]);

  const value = useMemo(() => ({
    staff,
    isLoading,
    error,
    addStaff,
    updateStaff,
    deleteStaff,
    seniorManagementTitles,
    allDepartments,
  }), [staff, isLoading, error, addStaff, updateStaff, deleteStaff, allDepartments]);

  return (
    <StaffContext.Provider value={value}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => {
  const context = useContext(StaffContext);
  if (context === undefined) {
    throw new Error('useStaff must be used within a StaffProvider');
  }
  return context;
}; 