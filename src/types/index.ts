export type ProjectCategory = 
  | 'All' 
  | 'Full Stack' 
  | 'Frontend' 
  | 'Backend & API' 
  | 'DevOps & Tools';

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  fullDescription: string;
  category: 'Full Stack' | 'Frontend' | 'Backend & API' | 'DevOps & Tools';
  featured: boolean;
  tags: string[];
  thumbnail: string;
  galleryImages?: string[];
  liveUrl?: string;
  githubUrl?: string;
  problemStatement: string;
  architectureOverview: string;
  architecturePoints: string[];
  keyFeatures: string[];
  technicalChallenges: string[];
  contributions: string[];
  stats?: {
    users?: string;
    performance?: string;
    queriesPerSec?: string;
    uptime?: string;
  };
  role: string;
  timeline: string;
  publishedAt: string;
}

export type GameCategory = 'All' | 'Arcade' | 'Puzzle' | 'Speed' | 'Strategy';

export interface Game {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Arcade' | 'Puzzle' | 'Speed' | 'Strategy';
  thumbnail: string;
  tags: string[];
  featured: boolean;
  playableOnline: boolean;
  controls: string[];
  instructions: string[];
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  techStack: string[];
}

export type TemplateCategory = 
  | 'All'
  | 'Portfolio' 
  | 'SaaS' 
  | 'Landing Pages' 
  | 'E-commerce' 
  | 'Dashboards' 
  | 'Education' 
  | 'Business';

export interface Template {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  fullDescription: string;
  category: 'Portfolio' | 'SaaS' | 'Landing Pages' | 'E-commerce' | 'Dashboards' | 'Education' | 'Business';
  previewImage: string;
  tags: string[];
  features: string[];
  responsiveBreakpoints: {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
  };
  demoUrl?: string;
  sourceUrl?: string;
  framework: string;
  styling: string;
  featured: boolean;
  version: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  type: 'Internship' | 'Full-time' | 'Contract';
  period: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  keyAchievements: string[];
  technologies: string[];
  verified: boolean;
  isInternship: boolean;
  website?: string;
}

export interface SkillItem {
  name: string;
  level: 'Expert' | 'Advanced' | 'Proficient' | 'Familiar';
  yearsExperience?: string;
  iconName: string;
  highlight?: boolean;
  description?: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  iconName: string;
  skills: SkillItem[];
}

export type AchievementCategory = 'All' | 'Certification' | 'Education' | 'Award' | 'Milestone';

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  category: 'Certification' | 'Education' | 'Award' | 'Milestone';
  credentialId?: string;
  credentialUrl?: string;
  description: string;
  skillsHighlighted: string[];
  verified: boolean;
  iconName: string;
  gradeOrScore?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  bio: string[];
  availability: {
    status: 'Available' | 'Busy' | 'Open for discussion';
    message: string;
    location: string;
    timezone: string;
  };
  contact: {
    email: string;
    github: string;
    linkedin: string;
    twitter?: string;
    discord?: string;
  };
  resumeUrl: string;
  metrics: Array<{
    label: string;
    value: string;
    description: string;
  }>;
  coreHighlights: string[];
}
