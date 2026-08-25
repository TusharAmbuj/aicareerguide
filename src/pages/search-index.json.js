import { getCollection } from 'astro:content';

export async function GET() {
  const [posts, projects, roadmaps, tools, resources] = await Promise.all([
    getCollection('blog', ({ data }) => !data.draft && data.status === 'published'),
    getCollection('projects', ({ data }) => !data.draft && data.status === 'published'),
    getCollection('roadmaps', ({ data }) => !data.draft && data.status === 'published'),
    getCollection('tools', ({ data }) => !data.draft && data.status === 'published'),
    getCollection('resources', ({ data }) => !data.draft && data.status === 'published'),
  ]);

  const index = [
    ...posts.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      category: item.data.category,
      type: 'Article',
      tags: [...item.data.tags, ...item.data.topics],
      url: `/blog/${item.id}/`,
      destination: 'internal',
    })),
    ...projects.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      category: item.data.category,
      type: 'Project',
      tags: [...item.data.techStack, ...item.data.skills],
      url: `/projects/${item.id}/`,
      destination: 'internal',
    })),
    ...roadmaps.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      category: item.data.category,
      type: 'Career',
      tags: [item.data.difficulty, ...item.data.skills],
      url: `/careers/${item.id}/`,
      destination: 'internal',
    })),
    ...tools.map((item) => ({
      title: item.data.name,
      description: item.data.description,
      category: item.data.category,
      type: 'Tool',
      tags: [item.data.pricing, ...item.data.tags],
      url: '/tools/',
      externalUrl: item.data.url,
      destination: 'external',
    })),
    ...resources.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      category: item.data.category,
      type: 'Resource',
      tags: [item.data.type, item.data.price, ...item.data.tags],
      url: '/resources/',
      externalUrl: item.data.url,
      destination: 'external',
    })),
  ];

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
