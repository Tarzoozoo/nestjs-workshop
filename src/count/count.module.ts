import { Module } from '@nestjs/common';
import { CountController } from './count.controller';

@Module({
  imports: [],
  controllers: [CountController],
  providers: [],
  exports: [],
})
export class CountModule {}
