import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/database/schemas/*.sql.ts',
  out: './src/database/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },

  extensionsFilters: ['postgis'],
  schemaFilter: 'public',
  tablesFilter: '*',
  introspect: {
    casing: 'camel',
  },

  migrations: {
    prefix: 'timestamp',
    table: '__drizzle_migrations__',
    schema: 'public',
  },

  breakpoints: true,
  strict: true,
  verbose: true,
});
