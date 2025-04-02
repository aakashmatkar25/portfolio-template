import Link from 'next/link';
import { Project } from '../types/project';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link 
      href={`/projects/${project.slug}`}
      className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition"
    >
      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      <p className="text-gray-400 text-sm mb-4">{project.date}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {(project.tags || []).map((tag, index) => (
          <span 
            key={index}
            className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-gray-300">{project.description}</p>
    </Link>
  );
}