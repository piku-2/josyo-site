import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const team = z.enum(['programming', 'illustration', 'cg', 'video', 'music']);

const works = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishedAt: z.coerce.date(),
        team,
        creator: z.string().default('情報処理研究会'),
        image: z.string().optional(),
        imageAlt: z.string().optional(),
        featured: z.boolean().default(false),
        tags: z.array(z.string()).default([]),
        externalUrl: z.string().url().optional(),
        draft: z.boolean().default(false),
    }),
});

export const collections = { works };
