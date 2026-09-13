import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const warnings = [];

const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const exists = (p) => fs.existsSync(path.join(root, p));

const required = [
  'astro.config.mjs',
  'package.json',
  'package-lock.json',
  '.nvmrc',
  'public/robots.txt',
  'public/_headers',
  'src/components/layout/BaseLayout.astro',
  'src/components/seo/SEO.astro',
  'src/pages/rss.xml.js',
];
for (const file of required) if (!exists(file)) errors.push(`missing required file: ${file}`);

const pkg = JSON.parse(read('package.json'));
if (pkg.engines?.node !== '>=22.19.0') errors.push(`package.json: expected Node engine >=22.19.0, got ${pkg.engines?.node ?? 'missing'}`);
if (read('.nvmrc').trim() !== '22.19.0') errors.push(`.nvmrc: expected 22.19.0, got ${read('.nvmrc').trim()}`);
if (!/^Sitemap:\s+https:\/\/aicareerguide\.xyz\/sitemap-index\.xml$/m.test(read('public/robots.txt'))) errors.push('robots.txt: sitemap directive is missing or incorrect');

const seo = read('src/components/seo/SEO.astro');
if (/SearchAction|potentialAction/.test(seo)) errors.push('SEO schema: obsolete SearchAction/potentialAction remains');
if (!/dateModified:\s+updatedDate\?\.toISOString\(\)/.test(seo)) errors.push('SEO schema: dateModified must use updatedDate only');
if (!/title\.includes\(siteTitle\)/.test(seo)) errors.push('SEO title builder: duplicate brand suffix protection is missing');

const newsRefs = [];
for (const dir of ['src/components', 'src/pages', 'src/lib']) {
  if (!exists(dir)) continue;
  const stack = [path.join(root, dir)];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (/\.(astro|js|ts|md|mdx)$/.test(entry.name)) {
        const text = fs.readFileSync(full, 'utf8');
        if (/\/news\//.test(text) || /getNews\b/.test(text)) newsRefs.push(path.relative(root, full));
      }
    }
  }
}
if (newsRefs.length) errors.push(`news surface still referenced in: ${newsRefs.join(', ')}`);

const blogDir = path.join(root, 'src/content/blog');
const ids = new Set();
const titles = new Map();
const routeSet = new Set([
  '/', '/ai/', '/blog/', '/careers/', '/projects/', '/tools/', '/resources/', '/authors/',
  '/search/', '/about/', '/contact/', '/privacy/', '/terms/', '/disclaimer/', '/editorial-policy/',
  '/rss.xml',
  '/ai/machine-learning/', '/ai/deep-learning/', '/ai/generative-ai/', '/ai/llms/', '/ai/ai-engineering/',
]);
for (const d of ['blog', 'roadmaps', 'projects', 'tools', 'resources']) {
  const dir = path.join(root, 'src/content', d);
  const files = fs.readdirSync(dir).filter((f) => /\.(md|mdx)$/.test(f));
  const base = d === 'blog' ? '/blog/' : d === 'roadmaps' ? '/careers/' : `/${d}/`;
  for (const file of files) {
    const text = fs.readFileSync(path.join(dir, file), 'utf8');
    const fm = text.startsWith('---') ? text.split('---', 3)[1] : '';
    const title = fm.match(/^title:\s*["']?(.*?)["']?\s*$/m)?.[1]?.trim();
    const key = `${d}:${file}`;
    if (ids.has(key)) errors.push(`duplicate content id: ${key}`);
    ids.add(key);
    if (d !== 'tools' && !title) errors.push(`${d}/${file}: missing title`);
    if (title) {
      const normalized = `${d}:${title.toLowerCase()}`;
      if (titles.has(normalized)) errors.push(`${d}/${file}: duplicate title also used by ${titles.get(normalized)}`);
      titles.set(normalized, `${d}/${file}`);
    }
    if (d === 'blog') {
      const body = text.replace(/^---[\s\S]*?---\s*/m, '');
      const withoutFences = body.replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, '');
      if (/^#\s+/m.test(withoutFences)) errors.push(`${d}/${file}: Markdown H1 found in body; ArticleLayout already renders the H1`);
      const sourceCount = (fm.match(/^\s*- title:/gm) || []).length;
      if (sourceCount < 3) errors.push(`${d}/${file}: fewer than 3 source entries`);
      if (/^status:\s*["']?published["']?/m.test(fm) && /^draft:\s*["']?true["']?/m.test(fm)) errors.push(`${d}/${file}: published content marked draft=true`);
    }
    routeSet.add(base + file.replace(/\.(md|mdx)$/, '') + '/');
  }
}

for (const dir of ['src/content', 'src/pages']) {
  const stack = [path.join(root, dir)];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (/\.(astro|md|mdx)$/.test(entry.name)) {
        const text = fs.readFileSync(full, 'utf8').replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, '');
        for (const match of text.matchAll(/\]\((\/[A-Za-z0-9_./-]+)(?:#[^)]+)?\)/g)) {
          let target = match[1];
          if (/\.(png|jpe?g|webp|svg|ico|json|xml)$/.test(target)) continue;
          if (!target.endsWith('/')) target += '/';
          if (target.startsWith('/blog/') && target !== '/blog/' && target !== '/blog//') continue;
          if (target.startsWith('/careers/') && target !== '/careers/' && !target.endsWith('/')) continue;
          if (target.startsWith('/projects/') && target !== '/projects/' && !target.endsWith('/')) continue;
          if (target.startsWith('/tools/') && target !== '/tools/' && !target.endsWith('/')) continue;
          if (target.startsWith('/resources/') && target !== '/resources/' && !target.endsWith('/')) continue;
          if (!routeSet.has(target)) warnings.push(`${path.relative(root, full)}: review internal route ${target}`);
        }
      }
    }
  }
}

if (!exists('public/robots.txt')) errors.push('robots.txt missing');
if (!exists('public/google149125f2adb906f3.html')) warnings.push('Google verification file not found; verify Search Console method if intentionally removed');


// Rendered-output checks (run after `astro build`; skipped when dist is absent).
const distDir = path.join(root, 'dist');
if (exists('dist')) {
  const htmlFiles = [];
  const walkDist = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walkDist(full);
      else if (entry.name.endsWith('.html')) htmlFiles.push(full);
    }
  };
  walkDist(distDir);
  let renderedSearchNoindex = false;
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const rel = path.relative(distDir, file).replaceAll(path.sep, '/');
    const h1Count = (html.match(/<h1\b/gi) || []).length;
    if (!rel.startsWith('google') && !rel.startsWith('404') && h1Count !== 1 && !rel.startsWith('careers/')) {
      errors.push(`dist/${rel}: expected exactly one H1, found ${h1Count}`);
    }
    if (rel === 'careers/index.html' || rel.startsWith('careers/')) {
      if (!rel.includes('index.html') || rel === 'careers/index.html') continue;
      if (h1Count !== 1) errors.push(`dist/${rel}: roadmap page must render exactly one H1, found ${h1Count}`);
    }
    if (rel === 'search/index.html' && /name=["']robots["'][^>]+content=["'][^"']*noindex/.test(html)) renderedSearchNoindex = true;
  }
  const sitemap = fs.existsSync(path.join(distDir, 'sitemap-0.xml'))
    ? fs.readFileSync(path.join(distDir, 'sitemap-0.xml'), 'utf8')
    : fs.existsSync(path.join(distDir, 'sitemap-index.xml'))
      ? fs.readFileSync(path.join(distDir, 'sitemap-index.xml'), 'utf8')
      : '';
  if (renderedSearchNoindex && sitemap.includes('https://aicareerguide.xyz/search/')) errors.push('dist sitemap: noindex /search/ URL is still present');
  if (sitemap.includes('https://aicareerguide.xyz/404/')) errors.push('dist sitemap: /404/ URL is still present');
  if (!fs.existsSync(path.join(distDir, 'sitemap-index.xml'))) errors.push('dist: sitemap-index.xml missing after build');
}

console.log(`Site audit: ${errors.length ? 'FAILED' : 'PASSED'}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);
for (const e of errors) console.error(`ERROR: ${e}`);
for (const w of warnings.slice(0, 50)) console.warn(`WARN: ${w}`);
if (warnings.length > 50) console.warn(`WARN: ${warnings.length - 50} additional warnings omitted`);
if (errors.length) process.exit(1);
