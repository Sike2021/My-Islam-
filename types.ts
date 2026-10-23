
export interface ProjectFile {
  name: string;
  content: string;
  path: string;
  type: 'file' | 'directory';
}

export interface ProjectState {
  name: string;
  files: ProjectFile[];
  lastModified: number;
}

export interface AIAnalysis {
  summary: string;
  suggestions: string[];
  vulnerabilities: string[];
}
