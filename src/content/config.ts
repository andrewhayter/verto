import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    date: z.date(),
    author: z.string().default('Verto Editorial'),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    ctaText: z.string().optional(),
    ctaUrl: z.string().optional(),
    readTime: z.number().default(5),
    sponsored: z.boolean().default(true),
  }),
});

export const collections = { articles };
