import test from 'node:test';
import assert from 'node:assert/strict';

const items = [
  { title: 'AI Engineer Roadmap', description: 'A practical path', category: 'Career', type: 'Career', tags: ['AI', 'Python'], url: '/careers/ai-engineer/' },
  { title: 'RAG Guide', description: 'Retrieval augmented generation', category: 'AI', type: 'Article', tags: ['RAG', 'LLM'], url: '/blog/rag-guide/' },
];

function simpleSearch(query, data) {
  const q = query.toLowerCase().trim();
  return data.filter((item) => [item.title, item.description, item.category, item.type, ...(item.tags || [])]
    .join(' ')
    .toLowerCase()
    .includes(q));
}

test('search finds a title match', () => {
  const result = simpleSearch('AI Engineer', items);
  assert.equal(result.length, 1);
  assert.equal(result[0].title, 'AI Engineer Roadmap');
});

test('search results can be filtered by type', () => {
  const result = simpleSearch('AI', items).filter((item) => item.type === 'Career');
  assert.equal(result.length, 1);
  assert.equal(result[0].category, 'Career');
});
