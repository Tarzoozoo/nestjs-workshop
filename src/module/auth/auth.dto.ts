import { createZodDto } from 'nestjs-zod';
import { authInsertEntitySchema } from './auth.entity';
import z from 'zod';

export const createRegisterUserDTOschema = authInsertEntitySchema;
export const registerUserDTOschema = z.object({
  name: z.string(),
  tel: z.string(),
  email: z.string(),
  password: z.string(),
});
export class RegisterUserDTO extends createZodDto(registerUserDTOschema) {}
