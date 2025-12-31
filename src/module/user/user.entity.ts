import { user } from '@/database/schemas/user.sql';
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
