export interface AuthorProfile {
  slug: string;
  name: string;
  type: 'Organization' | 'Person';
  bio: string;
  url: string;
  expertise: string[];
  links: { label: string; href: string }[];
}

export const AUTHORS: Record<string, AuthorProfile> = {
  'ai-career-guide': {
    slug: 'ai-career-guide',
    name: 'AI Career Guide',
    type: 'Organization',
    bio: 'Practical AI, software engineering, project, and career guidance for people building their future in technology.',
    url: '/authors/ai-career-guide/',
    expertise: ['Artificial Intelligence', 'Machine Learning', 'AI Engineering', 'Software Engineering', 'Technical Careers'],
    links: [],
  },
};

export function slugifyAuthor(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'ai-career-guide';
}

export function getAuthorProfile(name: string) {
  return AUTHORS[slugifyAuthor(name)] ?? {
    slug: slugifyAuthor(name),
    name,
    type: 'Person' as const,
    bio: 'Contributor to AI Career Guide.',
    url: `/authors/${slugifyAuthor(name)}/`,
    expertise: [],
    links: [],
  };
}
