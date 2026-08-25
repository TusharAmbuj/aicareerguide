import Fuse from 'fuse.js';

export type SearchType = 'Article' | 'Project' | 'Career' | 'Tool' | 'Resource';

export interface SearchItem {
  title: string;
  description: string;
  category: string;
  type: SearchType;
  tags: string[];
  url: string;
  externalUrl?: string;
}

export const searchKeys = [
  { name: 'title', weight: 3 },
  { name: 'description', weight: 1.5 },
  { name: 'category', weight: 1.2 },
  { name: 'type', weight: 1.2 },
  { name: 'tags', weight: 1.5 },
] as const;

export function createSearch(items: SearchItem[]) {
  return new Fuse<SearchItem>(items, {
    keys: [...searchKeys],
    threshold: 0.34,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });
}
