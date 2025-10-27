import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserRepository } from './user.repository';
import { UserInsertEntity, UserUpdateEntity } from './user.entity';
@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async create(payload: CreateUserDto) {
    const insertEntity: UserInsertEntity = { ...payload };
    return await this.userRepo.create(insertEntity);
  }

  async findAll() {
    return await this.userRepo.findAll();
  }

  async findOne(userId: string) {
    const user = await this.userRepo.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(userId: string, body: UpdateUserDto) {
    const updateEntity: UserUpdateEntity = { ...body };
    return this.userRepo.update(userId, updateEntity);
  }

  async remove(userId: string) {
    await this.userRepo.remove(userId);
    return { message: 'Delete success' };
  }
}
