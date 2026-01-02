import { uuid, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const oauthAccount = pgTable('oauth_account', {
  id: uuid().primaryKey().defaultRandom(),
  userID: text('user_id').notNull(),
  provider: text('provider').notNull(),
  providerID: text('provider_id').notNull(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
