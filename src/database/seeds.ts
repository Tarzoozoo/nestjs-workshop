// Make sure to install the 'pg' package
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

async function databaseConnection() {
  console.log('Testing database connection...');

  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(client);

  await db.execute('select 1');
}

databaseConnection()
  .catch((e) => {
    console.error('Database connection failed', e);
    process.exit(1);
  })
  .finally(() => {
    console.log('Database connection successful');
    process.exit(0);
  });
