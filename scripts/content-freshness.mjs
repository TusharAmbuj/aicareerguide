import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const today = Date.now();
const thresholds = { fresh: 90, review: 180 };
const dirs = ['blog', 'projects', 'roadmaps', 'tools', 'resources'];

function getDate(text, key) {
  const match = text.match(new RegExp(`^${key}:\\s*([^\\n]+)$`, 'm'));
  return match ? new Date(match[1].trim().replaceAll('"', '') + 'T00:00:00') : null;
}

for (const collection of dirs) {
  const dir = path.join(root, 'src', 'content', collection);
  for (const file of fs.readdirSync(dir).filter(f => /\.(md|mdx)$/.test(f))) {
    const full = path.join(dir, file);
    const text = fs.readFileSync(full, 'utf8');
    const date = getDate(text, collection === 'tools' || collection === 'resources' ? 'lastVerified' : 'updatedDate')
      || getDate(text, 'lastReviewed')
      || getDate(text, 'pubDate');
    if (!date || Number.isNaN(date.getTime())) continue;
    const age = Math.floor((today - date.getTime()) / 86400000);
    const label = age < thresholds.fresh ? 'FRESH' : age < thresholds.review ? 'REVIEW SOON' : 'STALE';
    console.log(`${label}\t${collection}\t${file}\t${age} days`);
  }
}
