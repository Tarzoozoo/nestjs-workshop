import z from 'zod';
import { userEntitySchema, authEntitySchema } from './user.entity';

export const userModelSchema = userEntitySchema;
export type UserModel = z.infer<typeof userModelSchema>;

// Auth model
export const authModelSchema = authEntitySchema;
export type AuthModel = z.infer<typeof authModelSchema>;
