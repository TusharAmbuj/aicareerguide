import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const collections = ['blog', 'projects', 'roadmaps', 'tools', 'resources'];
const errors = [];
const reminders = [];
const seen = new Map();
let featuredBlogCount = 0;

function filesFor(collection) {
  const dir = path.join(root, 'src', 'content', collection);
  return fs.readdirSync(dir).filter((f) => /\.(md|mdx)$/.test(f)).map((f) => path.join(dir, f));
}

function frontmatter(file) {
  const text = fs.readFileSync(file, 'utf8');
  if (!text.startsWith('---')) { errors.push(`${file}: missing frontmatter`); return { raw: text, data: {} }; }
  const end = text.indexOf('\n---', 3);
  if (end < 0) { errors.push(`${file}: malformed frontmatter`); return { raw: text, data: {} }; }
  const block = text.slice(4, end);
  const data = {};
  for (const line of block.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (match) data[match[1]] = match[2];
  }
  return { raw: text, data };
}

const routePatterns = [
  /^\/$/, /^\/ai(?:\/.*)?\/?$/, /^\/blog(?:\/.*)?\/?$/, /^\/careers(?:\/.*)?\/?$/,
  /^\/projects(?:\/.*)?\/?$/, /^\/tools(?:\/.*)?\/?$/, /^\/resources(?:\/.*)?\/?$/,
  /^\/search\/?$/, /^\/about\/?$/, /^\/contact\/?$/, /^\/privacy\/?$/, /^\/terms\/?$/, /^\/disclaimer\/?$/, /^\/editorial-policy\/?$/,
];

for (const collection of collections) {
  for (const file of filesFor(collection)) {
    const slug = path.basename(file).replace(/\.(md|mdx)$/, '');
    const key = `${collection}:${slug}`;
    if (seen.has(key)) errors.push(`${file}: duplicate slug ${slug}`);
    seen.set(key, file);
    const { raw, data } = frontmatter(file);
    if (!data.title && collection !== 'tools') errors.push(`${file}: missing title`);
    if (!data.description) errors.push(`${file}: missing description`);
    if (collection === 'blog') {
      if (!data.pubDate) errors.push(`${file}: missing pubDate`);
      if (!data.category) errors.push(`${file}: missing category`);
      if (!data.primaryTopic) errors.push(`${file}: missing primaryTopic`);
      if (data.featured === 'true') featuredBlogCount++;
      if (!data.imageAlt || data.imageAlt.length < 20) errors.push(`${file}: imageAlt should describe the actual article visual`);
      if (!data.difficulty) reminders.push(`${file}: difficulty will use the schema default`);
      if (data.updatedDate && data.pubDate && new Date(data.updatedDate) < new Date(data.pubDate)) errors.push(`${file}: updatedDate is earlier than pubDate`);
    }
    if (collection === 'projects' && (!data.difficulty || !data.techStack)) errors.push(`${file}: project requires difficulty and techStack`);
    if ((collection === 'tools' || collection === 'resources') && !data.url) errors.push(`${file}: missing url`);
    if ((collection === 'tools' || collection === 'resources') && !data.lastVerified) reminders.push(`${file}: add lastVerified after checking the URL/pricing`);
    if (data.draft === 'true' && (data.status === 'published' || data.status === 'review')) errors.push(`${file}: draft=true conflicts with status=${data.status}`);

    for (const match of raw.matchAll(/\]\((\/[^)\s#?]+(?:#[^)]*)?)\)/g)) {
      const target = match[1].split('#')[0];
      const pathTarget = target.replace(/\/$/, '') || '/';
      if (!routePatterns.some((pattern) => pattern.test(target))) {
        reminders.push(`${file}: review internal link ${target}`);
      }
    }
  }
}

const publicRoot = path.join(root, 'public');
const publicFiles = new Set();
function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else publicFiles.add(path.relative(publicRoot, full).replaceAll(path.sep, '/'));
  }
}
walk(publicRoot);
for (const expected of ['favicon.png', 'logo.webp', 'images/og-default.jpg', 'robots.txt']) {
  if (!publicFiles.has(expected)) errors.push(`public asset missing: ${expected}`);
}

if (featuredBlogCount > 1) errors.push(`blog: expected at most one featured article, found ${featuredBlogCount}`);

if (errors.length) {
  console.error(`Content check failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Content check passed. ${reminders.length} editorial reminder(s).`);
for (const reminder of reminders.slice(0, 40)) console.warn(`- ${reminder}`);
