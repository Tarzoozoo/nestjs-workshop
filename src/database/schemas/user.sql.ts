import { uuid, pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  gender: text().notNull(),
  age: integer().notNull().default(0),
  description: text(),
  interests: text(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});
