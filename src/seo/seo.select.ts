import { Prisma } from '../generated/prisma/client';

export const defaultSeoSelect = {
  id: true,
  url: true,
  seoTitle: true,
  seoDescription: true,
  h1: true,
  content: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.SeoSelect;

export const publicSeoSelect = {
  url: true,
  seoTitle: true,
  seoDescription: true,
  h1: true,
  content: true,
} satisfies Prisma.SeoSelect;
