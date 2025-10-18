import { createZodDto } from 'nestjs-zod';
import { userInsertEntitySchema } from './user.entity';

export const createUserDTOschema = userInsertEntitySchema.omit({
  createdAt: true,
  updatedAt: true,
});
export class CreateUserDto extends createZodDto(createUserDTOschema) {}

export const updateUserDTOschema = createUserDTOschema.partial();
export class UpdateUserDto extends createZodDto(updateUserDTOschema) {}
