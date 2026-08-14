export interface Project {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  date: string;
  tags: string[];
  image: string;
  github?: string;
  demo?: string;
  demoLabel?: string;
  featured: boolean;
  category: 'hardware' | 'software' | 'ai' | 'embedded' | 'web';
  problem?: string;
  process?: string;
  challenges?: string;
  results?: string;
  lessons?: string;
}

export interface Experience {
  id: string;
  company: string;
  logo?: string;
  role: string;
  type: 'professional' | 'leadership' | 'technical';
  startDate: string;
  endDate: string | 'Present';
  description: string;
  responsibilities: string[];
  skills: string[];
}

export interface Skill {
  name: string;
  category: 'programming' | 'frontend' | 'backend' | 'cad' | 'tools';
  icon?: string;
  description: string;
  proficiency: 1 | 2 | 3 | 4 | 5;
}
