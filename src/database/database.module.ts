import { Global, Module } from '@nestjs/common';
import { DatabaseProvider, databaseProvider } from './database.provider';

@Global()
@Module({
  providers: [...databaseProvider],
  exports: [DatabaseProvider],
})
export class DatabaseModule {}
