import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  CreateRegisterUserDto,
} from './user.dto';
import { UserRepository } from './user.repository';
import {
  UserInsertEntity,
  UserUpdateEntity,
  AuthInsertEntity,
} from './user.entity';
import { userModelSchema, AuthModel, authModelSchema } from './user.model';
import * as bcrypt from 'bcryptjs';

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

  async register(payload: CreateRegisterUserDto): Promise<AuthModel> {
    const hashedPassword: string = await bcrypt.hash(payload.password, 10);
    const registerEntity: AuthInsertEntity = {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      tel: payload.tel,
    };
    const entity = await this.userRepo.createAuthRegister(registerEntity);
    return authModelSchema.parse(entity);
  }

  async findAuthOneByEmail(email: string): Promise<AuthModel> {
    const entity = await this.userRepo.findAuthByEmail(email);
    return authModelSchema.parse(entity);
  }
}
