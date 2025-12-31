import { createZodDto } from 'nestjs-zod';
import {
  userInsertEntitySchema,
  userEntitySchema,
  authEntitySchema,
  authInsertEntitySchema,
} from './user.entity';

export const createUserDTOschema = userInsertEntitySchema.omit({
  createdAt: true,
  updatedAt: true,
});
export class CreateUserDto extends createZodDto(createUserDTOschema) {}

export const updateUserDTOschema = createUserDTOschema.partial();
export class UpdateUserDto extends createZodDto(updateUserDTOschema) {}

export const userDTOschema = userEntitySchema;
export class UserDto extends createZodDto(userDTOschema) {}

// Auth DTO
export const registerUserDTOschema = authEntitySchema;
export class RegisterUserDto extends createZodDto(registerUserDTOschema) {}

export const createRegisterUserDTOschema = authInsertEntitySchema;
export class CreateRegisterUserDto extends createZodDto(
  createRegisterUserDTOschema,
) {}
