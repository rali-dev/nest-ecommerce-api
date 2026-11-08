import { Prisma, User } from '../generated/prisma/client.js';

export const SafeUserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  mobile: true,
  email: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

export type SafeUser = Omit<User, 'password'>;
