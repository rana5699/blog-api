import { z } from 'zod';

export const blogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    author: z.string(),
    isPublished: z.boolean().default(true),
  }),
});

export const blogUpdateValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
  }),
});
