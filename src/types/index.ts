export interface NavLink {
  id: string;
  label: string;
}

export interface SkillItem {
  name: string;
  level: number;
  icon: string;
}

export interface SkillsData {
  [category: string]: SkillItem[];
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  tech: string[];
  github: string;
  demo: string;
  featured: boolean;
  color: string;
  category: string;
  stats?: {
    [key: string]: string;
  };
  problem?: string;
  solution?: string;
  challenges?: string[];
  learnings?: string[];
}

export interface CodingProfile {
  platform: string;
  username: string;
  url: string;
  stats: {
    solved?: number;
    easy?: number;
    medium?: number;
    hard?: number;
    rating?: number;
    stars?: number;
    globalRank?: string;
    score?: number;
    rank?: string;
    streak?: number;
    [key: string]: any;
  };
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  year: string;
  current?: string;
  cgpa?: string;
  score?: string;
  stream?: string;
  courses?: string[];
  highlights?: string[];
}

export interface Achievement {
  label: string;
  value: number;
  suffix: string;
  icon: string;
  color: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface AboutCard {
  title: string;
  icon: string;
  description: string;
  color: string;
}
