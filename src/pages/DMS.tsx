import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/components/LanguageContext';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import DMSDialog from '@/components/dms/DMSDialog';
import DMSBulkActions from '@/components/dms/DMSBulkActions';
import StaffManagement from '@/components/dashboard/StaffManagement';

// Types
interface YouthTalent {
  id: number;
  name: string;
  age: number;
  talent: string;
  program: string;
  joinedDate: string;
}

interface Team {
  id: number;
  name: string;
  sport: string;
  members: number;
  coach: string;
  founded: string;
}

interface Project {
  id: number;
  name: string;
  status: 'active' | 'completed' | 'planned';
  startDate: string;
  endDate: string;
  budget: number;
  location: string;
}

const DMS = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // State for data
  const [projects, setProjects] = useState<Project[]>([]);
  const [youthTalents, setYouthTalents] = useState<YouthTalent[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  // Fetch data based on active tab
  useEffect(() => {
    fetchData();
    // Reset selected items and search term when tab changes
    setSelectedItems([]);
    setSelectAll(false);
    setSearchTerm('');
  }, [activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      switch (activeTab) {
        case 'projects':
          const { data: projectsData, error: projectsError } = await supabase
            .from('projects')
            .select('*');
          if (projectsError) throw projectsError;
          setProjects(projectsData || []);
          break;
        case 'youth':
          const { data: youthData, error: youthError } = await supabase
            .from('youth_talents')
            .select('*');
          if (youthError) throw youthError;
          setYouthTalents(youthData || []);
          break;
        case 'teams':
          const { data: teamsData, error: teamsError } = await supabase
            .from('teams')
            .select('*');
          if (teamsError) throw teamsError;
          setTeams(teamsData || []);
          break;
        // Staff data will be managed within StaffManagement component
        case 'staff':
          // No need to fetch here, StaffManagement fetches its own data
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  // Handlers for Projects, Youth, Teams (Staff handled internally by StaffManagement)
  const handleAdd = () => {
    if (activeTab === 'staff') return; // Staff handled internally
    setDialogType('add');
    setSelectedItem(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: any) => {
     if (activeTab === 'staff') return; // Staff handled internally
    setDialogType('edit');
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleView = (item: any) => {
     if (activeTab === 'staff') return; // Staff handled internally
    setDialogType('view');
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
     if (activeTab === 'staff') return; // Staff handled internally
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      let error;
      switch (activeTab) {
        case 'projects':
          ({ error } = await supabase.from('projects').delete().eq('id', id));
          break;
        case 'youth':
          ({ error } = await supabase.from('youth_talents').delete().eq('id', id));
          break;
        case 'teams':
          ({ error } = await supabase.from('teams').delete().eq('id', id));
          break;
      }

      if (error) throw error;
      toast.success('Item deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

  const handleDialogSubmit = async (data: any) => {
    if (activeTab === 'staff') return; // Staff handled internally
    try {
      let error;
      if (dialogType === 'add') {
        switch (activeTab) {
          case 'projects':
            ({ error } = await supabase.from('projects').insert([data]));
            break;
          case 'youth':
            ({ error } = await supabase.from('youth_talents').insert([data]));
            break;
          case 'teams':
            ({ error } = await supabase.from('teams').insert([data]));
            break;
        }
      } else if (dialogType === 'edit') {
        switch (activeTab) {
          case 'projects':
            ({ error } = await supabase.from('projects').update(data).eq('id', data.id));
            break;
          case 'youth':
            ({ error } = await supabase.from('youth_talents').update(data).eq('id', data.id));
            break;
          case 'teams':
            ({ error } = await supabase.from('teams').update(data).eq('id', data.id));
            break;
        }
      }

      if (error) throw error;
      toast.success(dialogType === 'add' ? 'Item added successfully' : 'Item updated successfully');
      setIsDialogOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error saving item:', error);
      toast.error('Failed to save item');
    }
  };

  // Filter data based on search term
  const filteredData = () => {
    const searchLower = searchTerm.toLowerCase();
    switch (activeTab) {
      case 'projects':
        return projects.filter(project =>
          project.name.toLowerCase().includes(searchLower) ||
          project.location.toLowerCase().includes(searchLower)
        );
      case 'youth':
        return youthTalents.filter(youth =>
          youth.name.toLowerCase().includes(searchLower) ||
          youth.talent.toLowerCase().includes(searchLower)
        );
      case 'teams':
        return teams.filter(team =>
          team.name.toLowerCase().includes(searchLower) ||
          team.sport.toLowerCase().includes(searchLower)
        );
       // Staff filtering will be handled within StaffManagement component
      default:
        return [];
    }
  };

  const handleSelectAll = (checked: boolean) => {
     if (activeTab === 'staff') return; // Staff handled internally
    setSelectAll(checked);
    if (checked) {
      setSelectedItems(filteredData());
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (item: any, checked: boolean) => {
     if (activeTab === 'staff') return; // Staff handled internally
    if (checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter(selected => selected.id !== item.id));
    }
  };

  const handleBulkDelete = async (ids: number[]) => {
     if (activeTab === 'staff') return; // Staff handled internally
    if (!confirm('Are you sure you want to delete the selected items?')) return;

    try {
      let error;
      switch (activeTab) {
        case 'projects':
          ({ error } = await supabase.from('projects').delete().in('id', ids));
          break;
        case 'youth':
          ({ error } = await supabase.from('youth_talents').delete().in('id', ids));
          break;
        case 'teams':
          ({ error } = await supabase.from('teams').delete().in('id', ids));
          break;
      }

      if (error) throw error;
      toast.success('Selected items deleted successfully');
      setSelectedItems([]);
      setSelectAll(false);
      fetchData();
    } catch (error) {
      console.error('Error deleting items:', error);
      toast.error('Failed to delete items');
    }
  };

  // Determine which data to display based on the active tab and search term
  const displayData = activeTab === 'staff' ? [] : filteredData(); // Staff data handled by StaffManagement

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('dashboard.title', 'Admin Dashboard')}</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:grid-cols-4 lg:grid-cols-4">
          <TabsTrigger value="projects">{t('dashboard.tabs.projects', 'Projects')}</TabsTrigger>
          <TabsTrigger value="youth">{t('dashboard.tabs.youth', 'Youth & Talents')}</TabsTrigger>
          <TabsTrigger value="teams">{t('dashboard.tabs.teams', 'Teams')}</TabsTrigger>
          <TabsTrigger value="staff">{t('dashboard.tabs.staff', 'Staff')}</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          {/* Projects Management Content */}
          <Card>
            {/* Content for Projects Management */}
          </Card>
        </TabsContent>

        <TabsContent value="youth">
           {/* Youth & Talents Management Content */}
           <Card>
             {/* Content for Youth & Talents Management */}
           </Card>
        </TabsContent>

        <TabsContent value="teams">
          {/* Teams Management Content */}
          <Card>
             {/* Content for Teams Management */}
          </Card>
        </TabsContent>

        <TabsContent value="staff">
          {/* Staff Management Content */}
          <StaffManagement />
        </TabsContent>
      </Tabs>

      {/* DMS Dialog (used by Projects, Youth, Teams) */}
      {activeTab !== 'staff' && (
         <DMSDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          type={dialogType}
          initialData={selectedItem}
          onSubmit={handleDialogSubmit}
          activeTab={activeTab}
         />
      )}

    </div>
  );
};

export default DMS; 