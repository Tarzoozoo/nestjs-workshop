import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()

// Guard that uses the 'local' strategy for authentication (module/auth/stratagies/local.strategy.ts)
export class LocalAuthGuard extends AuthGuard('local') {}
