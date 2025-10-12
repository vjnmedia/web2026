import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { supabaseStaffService } from '@/services/supabaseStaffService';

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
  bio?: string;
  startDate?: string;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface StaffContextType {
  staff: StaffMember[];
  loading: boolean;
  error: string | null;
  addStaff: (staff: Omit<StaffMember, 'id'>) => Promise<void>;
  updateStaff: (id: number, staff: Partial<StaffMember>) => Promise<void>;
  deleteStaff: (id: number) => Promise<void>;
  fetchStaff: () => Promise<void>;
  allDepartments: string[];
  seniorManagementTitles: string[];
}

const StaffContext = createContext<StaffContextType | undefined>(undefined);

export const StaffProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [allDepartments, setAllDepartments] = useState<string[]>([]);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await supabaseStaffService.getAllStaff();
      setStaff(data);
      
      // Also fetch departments
      const departments = await supabaseStaffService.getAllDepartments();
      setAllDepartments(departments);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch staff';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addStaff = async (newStaff: Omit<StaffMember, 'id'>) => {
    try {
      const addedStaff = await supabaseStaffService.addStaff(newStaff);
      setStaff(prev => [...prev, addedStaff]);
      
      // Refresh departments
      const departments = await supabaseStaffService.getAllDepartments();
      setAllDepartments(departments);
      
      toast.success('Staff member added successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add staff member';
      toast.error(errorMessage);
      throw err;
    }
  };

  const updateStaff = async (id: number, updates: Partial<StaffMember>) => {
    try {
      const updatedStaff = await supabaseStaffService.updateStaff(id, updates);
      setStaff(prev => prev.map(member => 
        member.id === id ? updatedStaff : member
      ));
      
      // Refresh departments if department was updated
      if (updates.department) {
        const departments = await supabaseStaffService.getAllDepartments();
        setAllDepartments(departments);
      }
      
      toast.success('Staff member updated successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update staff member';
      toast.error(errorMessage);
      throw err;
    }
  };

  const deleteStaff = async (id: number) => {
    try {
      await supabaseStaffService.deleteStaff(id);
      setStaff(prev => prev.filter(member => member.id !== id));
      
      // Refresh departments
      const departments = await supabaseStaffService.getAllDepartments();
      setAllDepartments(departments);
      
      toast.success('Staff member deleted successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete staff member';
      toast.error(errorMessage);
      throw err;
    }
  };

  // Fetch staff on mount
  useEffect(() => {
    fetchStaff();
  }, []);

  const value: StaffContextType = {
    staff,
    loading,
    error,
    addStaff,
    updateStaff,
    deleteStaff,
    fetchStaff,
    allDepartments,
    seniorManagementTitles: supabaseStaffService.getSeniorManagementTitles(),
  };

  return (
    <StaffContext.Provider value={value}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = (): StaffContextType => {
  const context = useContext(StaffContext);
  if (context === undefined) {
    throw new Error('useStaff must be used within a StaffProvider');
  }
  return context;
};