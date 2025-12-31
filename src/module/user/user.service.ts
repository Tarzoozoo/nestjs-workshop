import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserRepository } from './user.repository';
import { UserInsertEntity, UserUpdateEntity } from './user.entity';
import { userModelSchema } from './user.model';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async create(payload: CreateUserDto) {
    const insertEntity: UserInsertEntity = { ...payload };
    const entity = await this.userRepo.create(insertEntity);
    return userModelSchema.parse(entity);
  }

  async findAll() {
    return await this.userRepo.findAll();
  }

  async findOne(userId: string) {
    const entity = await this.userRepo.findOne(userId);
    if (!entity) {
      throw new NotFoundException('User not found');
    }
    return userModelSchema.parse(entity);
  }

  async update(userId: string, body: UpdateUserDto) {
    const updateEntity: UserUpdateEntity = { ...body };
    const entity = await this.userRepo.update(userId, updateEntity);
    return userModelSchema.parse(entity);
  }

  async remove(userId: string) {
    await this.userRepo.remove(userId);
    return { message: 'Delete success' };
  }
}
