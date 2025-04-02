export interface Project {
    slug: string;
    title: string;
    date: string;
    tags: string[];
    description: string;
  }
  
  // Type guard for project validation
  export function isProject(project: any): project is Project {
    return (
      typeof project === 'object' &&
      typeof project.slug === 'string' &&
      typeof project.title === 'string'
    );
  }