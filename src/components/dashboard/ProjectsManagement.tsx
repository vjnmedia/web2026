import { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useProjects } from '@/hooks/useProjects';
import { Project } from '@/types/dms';

const ProjectsManagement = () => {
  const { t } = useLanguage();
  const { projects, loading, error, createProject, updateProject, deleteProject, fetchProjects } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    name: '',
    status: 'Planned',
    startDate: '',
    endDate: '',
    description: '',
    imageUrl: '',
    externalLink: '',
  });

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProject = () => {
    setFormData({
      name: '',
      status: 'Planned',
      startDate: '',
      endDate: '',
      description: '',
      imageUrl: '',
      externalLink: '',
    });
    setIsAddDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setFormData({
      name: project.name,
      status: project.status,
      startDate: project.startDate,
      endDate: project.endDate,
      description: project.description,
      imageUrl: project.imageUrl || '',
      externalLink: project.externalLink || '',
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteProject = (project: Project) => {
    setCurrentProject(project);
    setIsDeleteDialogOpen(true);
  };

  const saveNewProject = async () => {
    if (!formData.name || !formData.startDate || !formData.endDate || !formData.description) {
      toast.error(t('dashboard.allFieldsRequired'));
      return;
    }
    try {
      await createProject(formData);
      setIsAddDialogOpen(false);
      fetchProjects();
    } catch (err) {
      console.error("Failed to create project:", err);
    }
  };

  const saveEditedProject = async () => {
    if (!currentProject) return;
    if (!formData.name || !formData.startDate || !formData.endDate || !formData.description) {
      toast.error(t('dashboard.allFieldsRequired'));
      return;
    }
    try {
      await updateProject(currentProject.id, formData);
      setIsEditDialogOpen(false);
      setCurrentProject(null);
      fetchProjects();
    } catch (err) {
      console.error("Failed to update project:", err);
    }
  };

  const confirmDeleteProject = async () => {
    if (!currentProject) return;
    try {
      await deleteProject(currentProject.id);
      setIsDeleteDialogOpen(false);
      setCurrentProject(null);
      fetchProjects();
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-vjn-blue" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

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
              <TableHead>Image</TableHead>
              <TableHead>External Link</TableHead>
              <TableHead className="text-right">{t('dashboard.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
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
                  <TableCell>
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt="Project Image" className="w-12 h-12 object-cover rounded" />
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {project.externalLink ? (
                      <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className="text-vjn-blue hover:underline">
                        Link
                      </a>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEditProject(project)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteProject(project)}>
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
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                {t('dashboard.status')}
              </Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData({...formData, status: value})}
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
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
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
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="externalLink" className="text-right">
                External Link
              </Label>
              <Input
                id="externalLink"
                value={formData.externalLink}
                onChange={(e) => setFormData({...formData, externalLink: e.target.value})}
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
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  {t('dashboard.status')}
                </Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData({...formData, status: value})}
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
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
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
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="edit-imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-externalLink" className="text-right">
                  External Link
                </Label>
                <Input
                  id="edit-externalLink"
                  value={formData.externalLink}
                  onChange={(e) => setFormData({...formData, externalLink: e.target.value})}
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('dashboard.confirmDelete', 'Confirm Deletion')}</DialogTitle>
            <DialogDescription>
              {t('dashboard.deleteProjectConfirmation', 'Are you sure you want to delete this project? This action cannot be undone.')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              {t('dashboard.cancel')}
            </Button>
            <Button variant="destructive" onClick={confirmDeleteProject}>
              {t('dashboard.delete', 'Delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsManagement;
