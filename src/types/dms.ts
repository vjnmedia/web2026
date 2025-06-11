export interface Project {
  id: number;
  name: string;
  status: 'Planned' | 'Active' | 'Completed';
  startDate: string;
  endDate: string;
  description: string;
  imageUrl?: string;
  externalLink?: string;
}

export interface Youth {
  id: number;
  name: string;
  age: number;
  talent: string;
  program: string;
  joinedDate: string;
  contactInfo: any;
  achievements: string[];
}

export interface Team {
  id: number;
  name: string;
  sport: string;
  members: number;
  coach: string;
  founded: string;
  achievements: string[];
} 