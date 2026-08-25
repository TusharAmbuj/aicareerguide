import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const url = z.string().url();

export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
    schema: ({ image }) => z.object({
      title: z.string().min(10).max(140), description: z.string().min(40).max(300), pubDate: z.coerce.date(), updatedDate: z.coerce.date().optional(),
      author: z.string().default('AI Career Guide'), category: z.enum(['AI','Career','Projects','Technology']),
      primaryTopic: z.string().min(2).max(80),
      contentType: z.enum(['guide','tutorial','comparison','career','project','reference','opinion']).default('guide'),
      topics: z.array(z.string()).default([]), tags: z.array(z.string()).default([]), image: image().optional(),
      imageAlt: z.string().min(20).max(220).optional(), imageCaption: z.string().max(240).optional(), readingTime: z.string().optional(),
      keyTakeaways: z.array(z.string()).min(2).max(6).default([]), featured: z.boolean().default(false), draft: z.boolean().default(false),
      status: z.enum(['draft','review','published','archived']).default('published'), canonical: url.optional(), lastReviewed: z.coerce.date().optional(),
      difficulty: z.enum(['Beginner','Intermediate','Advanced']).default('Intermediate'), prerequisites: z.array(z.string()).default([]), nextSteps: z.array(z.string()).default([]),
      sources: z.array(z.object({ title: z.string().min(2).max(180), url })).default([]), articleType: z.enum(['BlogPosting','TechArticle']).default('BlogPosting'), authorType: z.enum(['Organization','Person']).default('Organization'),
    }),
  }),
  roadmaps: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/roadmaps', generateId: ({ entry }) => entry.replace(/\.md$/, '') }), schema:z.object({ title:z.string().min(10).max(140), description:z.string().min(40).max(300), category:z.string(), difficulty:z.enum(['Beginner','Intermediate','Advanced']), estimatedTime:z.string(), draft:z.boolean().default(false), status:z.enum(['draft','review','published','archived']).default('published'), image:z.string().optional(), skills:z.array(z.string()).default([]), featured:z.boolean().default(false) }) }),
  projects: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/projects', generateId: ({ entry }) => entry.replace(/\.md$/, '') }), schema:z.object({ title:z.string().min(10).max(140), description:z.string().min(40).max(300), category:z.enum(['AI','ML','LLM','Software']), difficulty:z.enum(['Beginner','Intermediate','Advanced']), timeToBuild:z.string(), techStack:z.array(z.string()), skills:z.array(z.string()).default([]), prerequisites:z.array(z.string()).default([]), learningOutcomes:z.array(z.string()).default([]), deployment:z.array(z.string()).default([]), estimatedCost:z.string().optional(), resumeValue:z.enum(['Low','Medium','High']).default('Medium'), interviewTopics:z.array(z.string()).default([]), githubUrl:url.optional(), demoUrl:url.optional(), image:z.string().optional(), featured:z.boolean().default(false), draft:z.boolean().default(false), status:z.enum(['draft','review','published','archived']).default('published'), pubDate:z.coerce.date(), updatedDate:z.coerce.date().optional() }) }),
  tools: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/tools', generateId: ({ entry }) => entry.replace(/\.md$/, '') }), schema:z.object({ name:z.string(), description:z.string().min(40).max(280), category:z.enum(['AI','Developer','Career','Research','Productivity','Design']), tags:z.array(z.string()).default([]), url, pricing:z.enum(['Free','Freemium','Paid']).default('Freemium'), featured:z.boolean().default(false), draft:z.boolean().default(false), status:z.enum(['draft','review','published','archived']).default('published'), lastVerified:z.coerce.date().optional(), recommendation:z.enum(['Highly Recommended','Recommended','Optional','Reference']).optional(), bestFor:z.array(z.string()).default([]) }) }),
  resources: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/resources', generateId: ({ entry }) => entry.replace(/\.md$/, '') }), schema:z.object({ title:z.string().min(10).max(140), description:z.string().min(40).max(300), type:z.enum(['Course','Book','Dataset','API','Roadmap']), category:z.string(), url, provider:z.string().optional(), price:z.enum(['Free','Paid','Freemium']).default('Free'), tags:z.array(z.string()).default([]), featured:z.boolean().default(false), draft:z.boolean().default(false), status:z.enum(['draft','review','published','archived']).default('published'), lastVerified:z.coerce.date().optional(), recommendation:z.enum(['Highly Recommended','Recommended','Optional','Reference']).optional(), bestFor:z.array(z.string()).default([]) }) }),
};
