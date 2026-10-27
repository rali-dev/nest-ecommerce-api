import { Prisma } from '../../generated/prisma/client.js';
import { Sort } from '../../blog/dtos/blog-query.dto';

export function sortFunction(sort?: Sort) {
  let orderBy: Prisma.BlogOrderByWithRelationInput = {};
  if (sort === Sort.Title) {
    orderBy = { title: 'asc' };
  } else if (sort === Sort.UpdatedAt) {
    orderBy = { updatedAt: 'desc' };
  } else {
    orderBy = { createdAt: 'asc' };
  }
  return orderBy;
}
