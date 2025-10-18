import { Inject } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from './schema';

export type DatabaseSchema = NodePgDatabase<typeof schema>;
export const DatabaseProvider = 'DrizzleAsyncProvider';

export const InjectDb = () => Inject(DatabaseProvider);

export const databaseProvider = [
  {
    provide: DatabaseProvider,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const connectionString = configService.get<string>('DATABASE_URL');
      const pool = new Pool({
        connectionString,
      });

      return drizzle(pool, { schema }) as DatabaseSchema;
    },
  },
];
