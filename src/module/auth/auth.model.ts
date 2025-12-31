import { z } from 'zod';
import { authEntitySchema } from './auth.entity';

export const authModelSchema = authEntitySchema;
export type AuthModel = z.infer<typeof authModelSchema>;

export type AuthUserInfo = {
  id: string;
  name: string;
  tel: string;
  email: string;
};

export type AccessToken = {
  access_token: string;
};
