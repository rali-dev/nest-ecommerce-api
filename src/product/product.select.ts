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

export const publicProductSelect = {
  id: true,
  title: true,
  thumbnail: true,
  price: true,
  discount: true,
  url: true,
} satisfies Prisma.ProductSelect;

export const publicProductDetailSelect = {
  ...publicProductSelect,
  content: true,
  images: true,
  categoryId: true,
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

export const publicProductCategorySelect = {
  id: true,
  title: true,
  url: true,
  image: true,
} satisfies Prisma.ProductCategorySelect;

export const publicProductCategoryDetailSelect = {
  ...publicProductCategorySelect,
  content: true,
} satisfies Prisma.ProductCategorySelect;
