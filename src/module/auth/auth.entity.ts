import { auth } from '@/database/schemas/auth.sql';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const authEntitySchema = createSelectSchema(auth);
export type AuthEntity = z.infer<typeof authEntitySchema>;

export const authInsertEntitySchema = createInsertSchema(auth).omit({
  id: true,
});
export type AuthInsertEntity = z.infer<typeof authInsertEntitySchema>;
