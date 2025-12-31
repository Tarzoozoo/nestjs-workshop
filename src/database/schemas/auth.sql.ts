import { uuid, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const auth = pgTable('auth', {
  id: uuid().primaryKey().defaultRandom(),
  name: text('name').notNull(),
  tel: text('tel').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
