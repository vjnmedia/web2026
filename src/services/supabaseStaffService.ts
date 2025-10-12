import { supabase } from '@/lib/supabase';
import { StaffMember } from '@/contexts/StaffContext';

// Senior management titles
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
  'LA MENNAIS DIRECTOR',
  'School Director'
];

// Transform Supabase data to StaffMember format
function transformSupabaseToStaffMember(supabaseStaff: any): StaffMember {
  // Determine if senior management based on position
  const isSeniorManagement = seniorManagementTitles.some(title => 
    supabaseStaff.position?.toLowerCase().includes(title.toLowerCase())
  );

  return {
    id: supabaseStaff.id,
    displayName: supabaseStaff.display_name || `${supabaseStaff.first_name} ${supabaseStaff.last_name}`,
    firstName: supabaseStaff.first_name,
    lastName: supabaseStaff.last_name,
    position: supabaseStaff.position,
    department: supabaseStaff.department,
    phone: supabaseStaff.phone,
    email: supabaseStaff.email,
    imageUrl: supabaseStaff.image_url,
    isSeniorManagement: isSeniorManagement,
    bio: supabaseStaff.bio || '',
    startDate: supabaseStaff.start_date || '',
    location: supabaseStaff.location || 'Kigali',
    createdAt: supabaseStaff.created_at,
    updatedAt: supabaseStaff.updated_at || supabaseStaff.created_at,
  };
}

// Transform StaffMember to Supabase format
function transformStaffMemberToSupabase(staff: Partial<StaffMember>): any {
  return {
    display_name: staff.displayName,
    first_name: staff.firstName,
    last_name: staff.lastName,
    position: staff.position,
    department: staff.department,
    phone: staff.phone,
    email: staff.email,
    image_url: staff.imageUrl,
    // Only include fields that exist in the actual table
    // bio, start_date, location, is_senior_management, social_username don't exist
  };
}

export const supabaseStaffService = {
  // Get all staff with optional filtering
  async getAllStaff(filters?: {
    department?: string;
    position?: string;
    seniorManagement?: string;
    search?: string;
  }): Promise<StaffMember[]> {
    try {
      let query = supabase
        .from('staff')
        .select('*')
        .order('department')
        .order('first_name');

      // Apply filters
      if (filters?.department && filters.department !== 'all') {
        query = query.eq('department', filters.department);
      }

      if (filters?.position && filters.position !== 'all') {
        query = query.eq('position', filters.position);
      }

      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase();
        query = query.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,display_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,position.ilike.%${searchTerm}%,department.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching staff from Supabase:', error);
        throw new Error('Failed to fetch staff data');
      }

      // Transform and sort the data
      let staff = (data || []).map(transformSupabaseToStaffMember);
      
      // Apply senior management filter after transformation
      if (filters?.seniorManagement && filters.seniorManagement !== 'all') {
        const isSenior = filters.seniorManagement === 'senior';
        staff = staff.filter(member => member.isSeniorManagement === isSenior);
      }
      
      // Sort: Senior management first, then by department, then by name
      staff.sort((a, b) => {
        if (a.isSeniorManagement && !b.isSeniorManagement) return -1;
        if (!a.isSeniorManagement && b.isSeniorManagement) return 1;
        
        if (a.department && b.department && a.department !== b.department) {
          return a.department.localeCompare(b.department);
        }
        
        return a.firstName.localeCompare(b.firstName);
      });

      return staff;
    } catch (error) {
      console.error('Error in getAllStaff:', error);
      throw error;
    }
  },

  // Add new staff member
  async addStaff(staff: Omit<StaffMember, 'id'>): Promise<StaffMember> {
    try {
      const supabaseData = transformStaffMemberToSupabase(staff);

      const { data, error } = await supabase
        .from('staff')
        .insert(supabaseData)
        .select()
        .single();

      if (error) {
        console.error('Error adding staff to Supabase:', error);
        throw new Error('Failed to add staff member');
      }

      return transformSupabaseToStaffMember(data);
    } catch (error) {
      console.error('Error in addStaff:', error);
      throw error;
    }
  },

  // Update staff member
  async updateStaff(id: number, updates: Partial<StaffMember>): Promise<StaffMember> {
    try {
      const supabaseData = transformStaffMemberToSupabase(updates);

      const { data, error } = await supabase
        .from('staff')
        .update(supabaseData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating staff in Supabase:', error);
        throw new Error('Failed to update staff member');
      }

      return transformSupabaseToStaffMember(data);
    } catch (error) {
      console.error('Error in updateStaff:', error);
      throw error;
    }
  },

  // Delete staff member
  async deleteStaff(id: number): Promise<void> {
    try {
      const { error } = await supabase
        .from('staff')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting staff from Supabase:', error);
        throw new Error('Failed to delete staff member');
      }
    } catch (error) {
      console.error('Error in deleteStaff:', error);
      throw error;
    }
  },

  // Get all departments
  async getAllDepartments(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select('department')
        .not('department', 'is', null);

      if (error) {
        console.error('Error fetching departments from Supabase:', error);
        return [];
      }

      const departments = Array.from(new Set(
        data.map(item => item.department).filter(Boolean)
      )).sort();

      return departments;
    } catch (error) {
      console.error('Error in getAllDepartments:', error);
      return [];
    }
  },

  // Get senior management titles
  getSeniorManagementTitles(): string[] {
    return seniorManagementTitles;
  },

  // Upload staff image
  async uploadStaffImage(file: File, staffId: number): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `staff-${staffId}-${Date.now()}.${fileExt}`;
      const filePath = `staff/${fileName}`;

      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('staff-photos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw new Error(`Upload failed: ${error.message}`);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('staff-photos')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading staff image:', error);
      throw new Error('Failed to upload image');
    }
  },

  // Delete staff image
  async deleteStaffImage(imageUrl: string): Promise<void> {
    try {
      // Extract file path from URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `staff/${fileName}`;

      const { error } = await supabase.storage
        .from('staff-photos')
        .remove([filePath]);

      if (error) {
        console.error('Error deleting staff image:', error);
        // Don't throw error for deletion failures as the image might not exist
      }
    } catch (error) {
      console.error('Error in deleteStaffImage:', error);
    }
  }
};
