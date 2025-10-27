import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
    summary: z.string().optional(),
    images: z.array(z.string()).or(z.string()).optional(),
    authors: z.array(z.string()).optional().default(['default']),
    layout: z.string().optional(),
    bibliography: z.string().optional(),
    canonicalUrl: z.string().optional(),
    lastmod: z.string().optional(),
  }),
});

export const collections = {
  blog,
};
