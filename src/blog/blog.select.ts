import { Prisma } from '../generated/prisma/client.js';
export const defaultBlogSelect: Prisma.BlogSelect = {
  id: true,
  title: true,
  content: true,
  createdAt: true,
  updatedAt: true,
};
