
import { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Project type definition
interface Project {
  id: number;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
}

// Mock data for projects
const mockProjects = [
  { id: 1, name: "Youth Empowerment Initiative", status: "Active", startDate: "2023-01-15", endDate: "2023-12-31" },
  { id: 2, name: "Digital Skills Training", status: "Completed", startDate: "2022-06-10", endDate: "2022-12-20" },
  { id: 3, name: "Community Peace Building", status: "Planned", startDate: "2023-07-01", endDate: "2024-06-30" },
  { id: 4, name: "Rural Health Outreach", status: "Active", startDate: "2023-03-01", endDate: "2023-08-31" },
];

const ProjectsManagement = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    name: '',
    status: 'Planned',
    startDate: '',
    endDate: ''
  });

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProject = () => {
    setNewProject({
      name: '',
      status: 'Planned',
      startDate: '',
      endDate: ''
    });
    setIsAddDialogOpen(true);
  };

  const handleEditProject = (id: number) => {
    const projectToEdit = projects.find(project => project.id === id);
    if (projectToEdit) {
      setCurrentProject(projectToEdit);
      setIsEditDialogOpen(true);
    }
  };

  const handleDeleteProject = (id: number) => {
    const projectToDelete = projects.find(project => project.id === id);
    if (projectToDelete) {
      setCurrentProject(projectToDelete);
      setIsDeleteDialogOpen(true);
    }
  };

  const saveNewProject = () => {
    if (!newProject.name || !newProject.startDate || !newProject.endDate) {
      toast.error(t('dashboard.allFieldsRequired'));
      return;
    }

    const newId = Math.max(...projects.map(p => p.id), 0) + 1;
    const projectToAdd = { id: newId, ...newProject };
    
    setProjects([...projects, projectToAdd]);
    setIsAddDialogOpen(false);
    toast.success(t('dashboard.projectAdded'));
  };

  const saveEditedProject = () => {
    if (!currentProject) return;
    
    const updatedProjects = projects.map(project =>
      project.id === currentProject.id ? currentProject : project
    );
    
    setProjects(updatedProjects);
    setIsEditDialogOpen(false);
    toast.success(t('dashboard.projectUpdated'));
  };

  const confirmDeleteProject = () => {
    if (!currentProject) return;
    
    setProjects(projects.filter(project => project.id !== currentProject.id));
    setIsDeleteDialogOpen(false);
    toast.success(t('dashboard.projectDeleted'));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{t('dashboard.projectsManagement')}</h2>
        <Button onClick={handleAddProject} className="bg-vjn-blue hover:bg-vjn-light-blue">
          <Plus className="mr-2 h-4 w-4" />
          {t('dashboard.addProject')}
        </Button>
      </div>
      
      <div className="flex items-center">
        <Input
          placeholder={t('dashboard.searchProjects')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('dashboard.projectName')}</TableHead>
              <TableHead>{t('dashboard.status')}</TableHead>
              <TableHead>{t('dashboard.startDate')}</TableHead>
              <TableHead>{t('dashboard.endDate')}</TableHead>
              <TableHead className="text-right">{t('dashboard.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  {t('dashboard.noProjects')}
                </TableCell>
              </TableRow>
            ) : (
              filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      project.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      project.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </TableCell>
                  <TableCell>{project.startDate}</TableCell>
                  <TableCell>{project.endDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEditProject(project.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteProject(project.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Project Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('dashboard.addProject')}</DialogTitle>
            <DialogDescription>
              {t('dashboard.addProjectDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {t('dashboard.projectName')}
              </Label>
              <Input
                id="name"
                value={newProject.name}
                onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                {t('dashboard.status')}
              </Label>
              <Select 
                value={newProject.status} 
                onValueChange={(value) => setNewProject({...newProject, status: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={t('dashboard.selectStatus')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planned">Planned</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                {t('dashboard.startDate')}
              </Label>
              <Input
                id="startDate"
                type="date"
                value={newProject.startDate}
                onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                {t('dashboard.endDate')}
              </Label>
              <Input
                id="endDate"
                type="date"
                value={newProject.endDate}
                onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {t('dashboard.cancel')}
            </Button>
            <Button onClick={saveNewProject} className="bg-vjn-blue hover:bg-vjn-light-blue">
              {t('dashboard.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('dashboard.editProject')}</DialogTitle>
          </DialogHeader>
          {currentProject && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  {t('dashboard.projectName')}
                </Label>
                <Input
                  id="edit-name"
                  value={currentProject.name}
                  onChange={(e) => setCurrentProject({...currentProject, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  {t('dashboard.status')}
                </Label>
                <Select 
                  value={currentProject.status} 
                  onValueChange={(value) => setCurrentProject({...currentProject, status: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder={t('dashboard.selectStatus')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planned">Planned</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-startDate" className="text-right">
                  {t('dashboard.startDate')}
                </Label>
                <Input
                  id="edit-startDate"
                  type="date"
                  value={currentProject.startDate}
                  onChange={(e) => setCurrentProject({...currentProject, startDate: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-endDate" className="text-right">
                  {t('dashboard.endDate')}
                </Label>
                <Input
                  id="edit-endDate"
                  type="date"
                  value={currentProject.endDate}
                  onChange={(e) => setCurrentProject({...currentProject, endDate: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {t('dashboard.cancel')}
            </Button>
            <Button onClick={saveEditedProject} className="bg-vjn-blue hover:bg-vjn-light-blue">
              {t('dashboard.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('dashboard.confirmDelete')}</DialogTitle>
            <DialogDescription>
              {t('dashboard.deleteProjectConfirmation')}
            </DialogDescription>
          </DialogHeader>
          {currentProject && (
            <div className="py-4">
              <p className="text-center font-medium">{currentProject.name}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              {t('dashboard.cancel')}
            </Button>
            <Button variant="destructive" onClick={confirmDeleteProject}>
              {t('dashboard.delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsManagement;
