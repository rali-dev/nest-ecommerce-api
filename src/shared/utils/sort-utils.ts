import { Prisma } from '../../generated/prisma/client.js';
import {
  BlogSort,
  ProductCategorySort,
  ProductSort,
  UserSort,
} from '../dtos/general-query.dto';

export function blogSortFunction(sort?: BlogSort) {
  let orderBy: Prisma.BlogOrderByWithRelationInput = {};
  if (sort === BlogSort.Title) {
    orderBy = { title: 'asc' };
  } else if (sort === BlogSort.UpdatedAt) {
    orderBy = { updatedAt: 'desc' };
  } else {
    orderBy = { createdAt: 'desc' };
  }
  return orderBy;
}

export function blogCategorySortFunction(sort?: BlogSort) {
  let orderBy: Prisma.BlogCategoryOrderByWithRelationInput = {};
  if (sort === BlogSort.Title) {
    orderBy = { title: 'asc' };
  } else if (sort === BlogSort.UpdatedAt) {
    orderBy = { updatedAt: 'desc' };
  } else {
    orderBy = { createdAt: 'desc' };
  }
  return orderBy;
}

export function userSortFunction(sort?: UserSort) {
  let orderBy: Prisma.UserOrderByWithRelationInput = {};
  if (sort === UserSort.LastName) {
    orderBy = { lastName: 'asc' };
  } else if (sort === UserSort.UpdatedAt) {
    orderBy = { updatedAt: 'desc' };
  } else {
    orderBy = { createdAt: 'desc' };
  }
  return orderBy;
}

export function productSortFunction(sort?: ProductSort) {
  let orderBy: Prisma.ProductOrderByWithRelationInput = {};
  if (sort === ProductSort.Title) {
    orderBy = { title: 'asc' };
  } else if (sort === ProductSort.Cheap) {
    orderBy = { price: 'asc' };
  } else if (sort === ProductSort.Expensive) {
    orderBy = { price: 'desc' };
  } else if (sort === ProductSort.UpdatedAt) {
    orderBy = { updatedAt: 'desc' };
  } else {
    orderBy = { createdAt: 'desc' };
  }
  return orderBy;
}

export function productCategorySortFunction(sort?: ProductCategorySort) {
  let orderBy: Prisma.ProductCategoryOrderByWithRelationInput = {};
  if (sort === ProductCategorySort.Title) {
    orderBy = { title: 'asc' };
  } else if (sort === ProductCategorySort.UpdatedAt) {
    orderBy = { updatedAt: 'desc' };
  } else {
    orderBy = { createdAt: 'desc' };
  }
  return orderBy;
}
