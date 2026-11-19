import { Prisma } from '../generated/prisma/client.js';
export const defaultBlogSelect = {
  id: true,
  title: true,
  content: true,
  image: true,
  url: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.BlogSelect;

export const defaultBlogCategorySelect = {
  id: true,
  title: true,
  content: true,
  image: true,
  url: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.BlogCategorySelect;

export const publicBlogCategorySelect = {
  id: true,
  title: true,
  url: true,
  image: true,
} satisfies Prisma.BlogCategorySelect;

export const publicBlogCategoryDetailSelect = {
  ...publicBlogCategorySelect,
  content: true,
} satisfies Prisma.BlogCategorySelect;

export const publicBlogSelect = {
  id: true,
  title: true,
  image: true,
  url: true,
} satisfies Prisma.BlogSelect;

export const publicBlogDetailSelect = {
  ...defaultBlogSelect,
  content: true,
  categoryId: true,
} satisfies Prisma.BlogSelect;
