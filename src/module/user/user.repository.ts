import {
  Injectable,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { eq, isNull, and } from 'drizzle-orm';
import {
  UserEntity,
  UserInsertEntity,
  UserUpdateEntity,
  userEntitySchema,
  AuthEntity,
  AuthInsertEntity,
  authEntitySchema,
} from './user.entity';
import { DatabaseSchema, InjectDb } from '@/database/database.provider';
import { user } from '@/database/schemas/user.sql';
import { auth } from '@/database/schemas/auth.sql';

@Injectable()
export class UserRepository {
  constructor(@InjectDb() private readonly db: DatabaseSchema) {}

  async create(payload: UserInsertEntity): Promise<UserEntity> {
    const _user = await this.db.insert(user).values(payload).returning();
    return userEntitySchema.parse(_user[0]);
  }

  async findAll() {
    const _user = await this.db.select().from(user);
    return userEntitySchema.array().parse(_user);
  }

  async findOne(id: string): Promise<UserEntity> {
    const _user = await this.db
      .select()
      .from(user)
      .where(and(eq(user.id, id), isNull(user.deletedAt)));
    if (!_user.length) {
      throw new InternalServerErrorException(`User '${id}' does not exist`);
    }
    return userEntitySchema.parse(_user[0]);
  }

  async update(id: string, payload: UserUpdateEntity): Promise<UserEntity> {
    const _user = await this.db
      .update(user)
      .set(payload)
      .where(and(eq(user.id, id), isNull(user.deletedAt)))
      .returning();
    return userEntitySchema.parse(_user[0]);
  }

  async remove(id: string): Promise<boolean> {
    const _user = await this.db
      .update(user)
      .set({ deletedAt: new Date() })
      .where(and(eq(user.id, id), isNull(user.deletedAt)))
      .returning();

    if (!_user.length) {
      throw new InternalServerErrorException(`User '${id}' does not exist`);
    }
    return true;
  }

  // Auth methods
  async createAuthRegister(payload: AuthInsertEntity): Promise<AuthEntity> {
    const _auth = await this.db.insert(auth).values(payload).returning();

    return authEntitySchema.parse(_auth[0]);
  }

  async findAuthByEmail(email: string): Promise<AuthEntity> {
    const _auth = await this.db
      .select()
      .from(auth)
      .where(eq(auth.email, email));
    if (!_auth.length) {
      throw new ForbiddenException(`Email '${email}' does not exist`);
    }
    return authEntitySchema.parse(_auth[0]);
  }
}
