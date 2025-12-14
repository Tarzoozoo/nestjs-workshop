import z from 'zod';
import { userEntitySchema } from './user.entity';

export const userModelSchema = userEntitySchema;
export type UserModel = z.infer<typeof userModelSchema>;