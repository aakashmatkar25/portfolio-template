import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import Markdown from 'react-markdown';

export async function generateStaticParams() {
  const projectsDir = join(process.cwd(), 'content/projects');
  return readdirSync(projectsDir).map((file) => ({
    slug: file.replace('.md', ''),
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const filePath = join(process.cwd(), 'content/projects', `${params.slug}.md`);
  const fileContents = readFileSync(filePath, 'utf8');
  const { data: frontmatter, content } = matter(fileContents);

  if (!frontmatter.title) {
    return <div>Project not found</div>;
  }

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
      <div className="prose prose-invert max-w-none">
        <Markdown>{content}</Markdown>
      </div>
    </article>
  );
}