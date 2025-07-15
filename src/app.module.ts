import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

const mongoUri =
  process.env.MONGO_URI ||
  'mongodb://root:example@mongo:27017/mongo?authSource=admin';
console.log(mongoUri);

@Module({
  imports: [MongooseModule.forRoot(mongoUri), ProductsModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
