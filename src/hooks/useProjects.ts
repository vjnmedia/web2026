import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Project } from '@/types/dms';

const API_URL = '/api/projects';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Project[]>(API_URL);
      setProjects(response.data);
      setError(null);
    } catch (err: any) {
      setError('Failed to fetch projects');
      toast.error('Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (project: Omit<Project, 'id'>) => {
    try {
      const response = await axios.post<Project>(API_URL, project);
      setProjects(prev => [...prev, response.data]);
      toast.success('Project created successfully');
      return response.data;
    } catch (err: any) {
      toast.error('Failed to create project');
      console.error('Error creating project:', err);
      throw err;
    }
  };

  const updateProject = async (id: number, project: Partial<Project>) => {
    try {
      const response = await axios.put<Project>(`${API_URL}/${id}`, project);
      setProjects(prev => prev.map(p => (p.id === id ? response.data : p)));
      toast.success('Project updated successfully');
      return response.data;
    } catch (err: any) {
      toast.error('Failed to update project');
      console.error('Error updating project:', err);
      throw err;
    }
  };

  const deleteProject = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProjects(prev => prev.filter(p => p.id !== id));
      toast.success('Project deleted successfully');
    } catch (err: any) {
      toast.error('Failed to delete project');
      console.error('Error deleting project:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
}; 