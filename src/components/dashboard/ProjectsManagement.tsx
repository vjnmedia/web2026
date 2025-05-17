
import { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from 'lucide-react';

// Mock data for projects
const mockProjects = [
  { id: 1, name: "Youth Empowerment Initiative", status: "Active", startDate: "2023-01-15", endDate: "2023-12-31" },
  { id: 2, name: "Digital Skills Training", status: "Completed", startDate: "2022-06-10", endDate: "2022-12-20" },
  { id: 3, name: "Community Peace Building", status: "Planned", startDate: "2023-07-01", endDate: "2024-06-30" },
  { id: 4, name: "Rural Health Outreach", status: "Active", startDate: "2023-03-01", endDate: "2023-08-31" },
];

const ProjectsManagement = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProject = () => {
    // In a real app, this would open a modal or navigate to a form
    console.log("Add new project");
  };

  const handleEditProject = (id: number) => {
    console.log("Edit project with id:", id);
  };

  const handleDeleteProject = (id: number) => {
    console.log("Delete project with id:", id);
    setProjects(projects.filter(project => project.id !== id));
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
    </div>
  );
};

export default ProjectsManagement;
