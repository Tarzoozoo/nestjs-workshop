import { oauthAccount } from '@/database/schemas/oauth-accout.sql';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const oauthAccountEntitySchema = createSelectSchema(oauthAccount);
export type OAuthAccountEntity = z.infer<typeof oauthAccountEntitySchema>;

export const oaithAccountInsertEntitySchema = createInsertSchema(
  oauthAccount,
).omit({
  id: true,
});
export type OAuthAccountInsertEntity = z.infer<
  typeof oaithAccountInsertEntitySchema
>;
