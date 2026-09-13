# AI Career Guide

AI Career Guide is an Astro-based learning and career platform focused on AI, software engineering, projects, roadmaps, resources, and practical technical guidance.

## Stack

- Astro
- TypeScript
- Tailwind CSS
- MDX/content collections
- Fuse.js search
- Cloudflare Pages compatible static output

## Runtime

Use **Node.js 22.19.0+**. The repository pins the baseline in `.nvmrc`.

## Commands

```bash
npm install
npm run dev
npm run audit
npm run content:check
npm test
npm run build
```

`npm run audit` performs source-level checks for SEO/schema regressions, content structure, internal routes, publishing-state conflicts, and deployment assumptions.

## Main sections

- `/ai/` — AI learning topics
- `/blog/` — guides and technical articles
- `/careers/` — career roadmaps
- `/projects/` — practical projects
- `/tools/` — curated tools
- `/resources/` — curated learning resources

## Content workflow

Articles, projects, roadmaps, tools, and resources live in `src/content/` and are validated before release. Published content must satisfy the collection schema and editorial checks.

## Deployment

The project is designed for static deployment on Cloudflare Pages. The public site should remain the publishing target; a future private `studio.aicareerguide.xyz` application can handle writer/editor workflows without being part of the public content surface.
