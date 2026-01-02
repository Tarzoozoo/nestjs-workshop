import { Public } from '@/common/decorators/public.decorator';
import { Controller, Get } from '@nestjs/common';

let count = 0;
import * as os from 'os';

@Public()
@Controller('count')
export class CountController {
  @Get()
  getCount() {
    return { count: count++ };
  }

  @Get('owner')
  getOwner() {
    return { owner: os.hostname() };
  }
}
