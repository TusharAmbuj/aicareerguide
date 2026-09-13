import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
if (!fs.existsSync(dist)) {
  console.log('Rendered audit: skipped (dist/ not found). Run npm run build first.');
  process.exit(0);
}
const errors = [];
const htmlFiles = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
};
walk(dist);

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(dist, file).replaceAll(path.sep, '/');
  if (rel.startsWith('google') || rel === '404.html') continue;
  const title = /<title>\s*([^<]+?)\s*<\/title>/i.exec(html)?.[1]?.trim();
  const description = /<meta\s+name=["']description["'][^>]*content=["']([^"']*)["']/i.exec(html)?.[1]?.trim();
  const canonical = /<link\s+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i.exec(html)?.[1];
  const h1 = (html.match(/<h1\b/gi) || []).length;
  if (!title) errors.push(`${rel}: missing title`);
  if (!description) errors.push(`${rel}: missing meta description`);
  if (!canonical && rel !== 'rss.xml') errors.push(`${rel}: missing canonical`);
  if (h1 !== 1 && !rel.startsWith('careers/')) errors.push(`${rel}: expected exactly one H1, found ${h1}`);
  const imgs = [...html.matchAll(/<img\b([^>]*)>/gi)];
  for (const [, attrs] of imgs) {
    const altMatch = /\balt=["']([^"']*)["']/i.exec(attrs);
    if (!altMatch) errors.push(`${rel}: image missing alt attribute`);
  }
  if (rel === 'blog/index.html') {
    const featuredImage = /class=["'][^"']*blog-feature-image[^"']*["'][\s\S]*?<img\b([^>]*)>/i.exec(html)?.[1] || '';
    const featuredAlt = /\balt=["']([^"']+)["']/i.exec(featuredImage)?.[1]?.trim();
    if (!featuredAlt) errors.push('blog/index.html: featured image must have non-empty alt text');
  }
  for (const match of html.matchAll(/href=["']([^"']*)["']/gi)) {
    const href = match[1];
    if (href === '#') errors.push(`${rel}: empty # link found`);
  }
}

const sitemapPath = path.join(dist, 'sitemap-0.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  if (sitemap.includes('https://aicareerguide.xyz/search/')) errors.push('sitemap: /search/ must not be indexed');
  if (sitemap.includes('https://aicareerguide.xyz/404/')) errors.push('sitemap: /404/ must not be indexed');
}

console.log(`Rendered audit: ${errors.length ? 'FAILED' : 'PASSED'}`);
console.log(`Pages scanned: ${htmlFiles.length}`);
console.log(`Errors: ${errors.length}`);
for (const error of errors) console.error(`ERROR: ${error}`);
if (errors.length) process.exit(1);
