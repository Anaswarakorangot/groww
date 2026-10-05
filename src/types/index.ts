export interface College {
  id: string;
  name: string;
  shortName: string;
  verifiedCount: number;
  goal: number;
}

export interface Registration {
  id: string;
  name: string;
  email?: string;
  phone: string;
  college: string;
  branch: Branch;
  refCode: string;
  studentCode: string;
  atsScore?: number;
  gaps?: string[];
  projectSuggestion?: ProjectSuggestion;
  verified: boolean;
  createdAt: Date;
}

export type Branch = 'CSE' | 'IT' | 'ECE' | 'EEE' | 'MECH' | 'CIVIL';

export interface ProjectSuggestion {
  title: string;
  description: string;
  resumeBullet: string;
}

export interface ATSResult {
  score: number;
  gaps: string[];
  projects: ProjectSuggestion[];
  extractedName?: string;
  extractedCollege?: string;
  extractedBranch?: Branch;
}

export interface Representative {
  code: string;
  name: string;
  college: string;
  verifiedCount: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}
