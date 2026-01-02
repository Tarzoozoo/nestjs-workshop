import { Injectable } from '@nestjs/common';
import { DatabaseSchema, InjectDb } from '@/database/database.provider';
import {
  OAuthAccountEntity,
  oauthAccountEntitySchema,
  OAuthAccountInsertEntity,
} from './oauth.entity';
import { eq, and } from 'drizzle-orm';
import { oauthAccount } from '@/database/schemas/oauth-accout.sql';
@Injectable()
export class OAuthRepository {
  constructor(@InjectDb() private readonly db: DatabaseSchema) {}

  // Get OAuth account by provider and ID
  async find(
    provider: string,
    providerID: string,
  ): Promise<OAuthAccountEntity | null> {
    const _oauthAccount = await this.db
      .select()
      .from(oauthAccount)
      .where(
        and(
          eq(oauthAccount.provider, provider),
          eq(oauthAccount.providerID, providerID),
        ),
      );
    if (!_oauthAccount.length) {
      return null;
    }
    return oauthAccountEntitySchema.parse(_oauthAccount[0]);
  }

  // Post OAuth account if not exists
  async create(payload: OAuthAccountInsertEntity): Promise<OAuthAccountEntity> {
    const _oauthAccount = await this.db
      .insert(oauthAccount)
      .values(payload)
      .returning();
    return oauthAccountEntitySchema.parse(_oauthAccount[0]);
  }
}
