import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// import { MongooseModule } from '@nestjs/mongoose';
// import { ProductsModule } from './products/products.module';
// import { OrdersModule } from './orders/orders.module';
import { CountModule } from './count/count.module';
import { UserModule } from './user/user.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './user/user.entity';
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
    // MongooseModule.forRoot(mongoUri),
    // ProductsModule,
    // OrdersModule,
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
