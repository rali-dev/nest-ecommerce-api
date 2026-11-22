import { Prisma } from '../generated/prisma/client.js';

export const defaultProductSelect = {
  id: true,
  title: true,
  content: true,
  images: true,
  thumbnail: true,
  price: true,
  discount: true,
  url: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ProductSelect;

export const defaultProductCategorySelect = {
  id: true,
  title: true,
  content: true,
  image: true,
  url: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ProductCategorySelect;
