import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { AuthEntity, AuthInsertEntity, authEntitySchema } from './auth.entity';
import { DatabaseSchema, InjectDb } from '@/database/database.provider';
import { auth } from '@/database/schemas/auth.sql';

@Injectable()
export class AuthRepository {
  constructor(@InjectDb() private readonly db: DatabaseSchema) {}

  // Auth methods
  async createAuthRegister(payload: AuthInsertEntity): Promise<AuthEntity> {
    const _auth = await this.db.insert(auth).values(payload).returning();

    return authEntitySchema.parse(_auth[0]);
  }

  async findAuthByEmail(email: string): Promise<AuthEntity | null> {
    const _auth = await this.db
      .select()
      .from(auth)
      .where(eq(auth.email, email));
    console.log('_auth:', _auth);
    if (!_auth.length) {
      return null;
    }
    return authEntitySchema.parse(_auth[0]);
  }
}
