import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import ProjectCard from '../../components/ProjectCard';
import { Project } from '../../types/project'; // Add this import

export default function ProjectsPage() {
  const projectsDir = join(process.cwd(), 'content/projects');
  const files = readdirSync(projectsDir);
  
  // Add explicit type annotation to projects array
  const projects: Project[] = files.map(filename => {
    const fileContents = readFileSync(join(projectsDir, filename), 'utf8');
    const { data } = matter(fileContents);
    
    return {
      slug: filename.replace('.md', ''),
      title: data.title || 'Untitled Project',
      date: data.date || '',
      tags: data.tags || [],
      description: data.description || ''
    } as Project; // Add type assertion
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">All Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => ( // Remove explicit type here since array is already typed
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}