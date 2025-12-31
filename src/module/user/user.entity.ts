import { user } from '@/database/schemas/user.sql';
import { auth } from '@/database/schemas/auth.sql';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const userEntitySchema = createSelectSchema(user);
export type UserEntity = z.infer<typeof userEntitySchema>;

export const userInsertEntitySchema = createInsertSchema(user).omit({
  id: true,
  deletedAt: true,
});
export type UserInsertEntity = z.infer<typeof userInsertEntitySchema>;

export const userUpdateEntitySchema = userInsertEntitySchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .partial();
export type UserUpdateEntity = z.infer<typeof userUpdateEntitySchema>;

export const userDeleteEntitySchema = userEntitySchema.pick({
  id: true,
});
export type UserDeleteEntity = z.infer<typeof userDeleteEntitySchema>;

// Auth entity
export const authEntitySchema = createSelectSchema(auth);
export type AuthEntity = z.infer<typeof authEntitySchema>;

export const authInsertEntitySchema = createInsertSchema(auth).omit({
  id: true,
});
export type AuthInsertEntity = z.infer<typeof authInsertEntitySchema>;
