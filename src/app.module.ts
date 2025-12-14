import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CountModule } from './module/count/count.module';
import { UserModule } from './module/user/user.module';
import { DatabaseModule } from './database/database.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
const mongoUri =
  process.env.MONGO_URI ||
  'mongodb://root:example@mongo:27017/mongo?authSource=admin';
console.log(mongoUri);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CountModule,
    UserModule,
    DatabaseModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
