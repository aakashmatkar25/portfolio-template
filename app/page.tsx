import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import ProjectCard from '../components/ProjectCard';
import { Project } from '../types/project';

export default function Home() {
  const projectsDir = join(process.cwd(), 'content/projects');
  const projects: Project[] = readdirSync(projectsDir)
    .map(filename => {
      try {
        const filePath = join(projectsDir, filename);
        const fileContents = readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        
        return {
          slug: filename.replace('.md', ''),
          title: data.title || 'Untitled Project',
          date: data.date || '',
          tags: data.tags || [],
          description: data.description || ''
        } as Project;
      } catch (error) {
        console.error(`Error processing file ${filename}:`, error);
        return null;
      }
    })
    .filter((project): project is Project => project !== null);

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Full Stack Developer</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Building digital experiences with modern technologies
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.slice(0, 3).map((project, index) => (
          <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section id="contact" className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Contact Me</h2>
        <form 
          action="https://formspree.io/f/YOUR_FORM_ID" 
          method="POST"
          className="space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Your email"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700"
            required
          />
          <textarea
            name="message"
            placeholder="Your message"
            rows={4}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}