import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CountModule } from './module/count/count.module';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { APP_PIPE, APP_GUARD } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { JwtAuthGuard } from './common/gards/jwt.auth.guard';
import { OAuthModule } from './module/auth/oauth/oauth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CountModule,
    UserModule,
    DatabaseModule,
    AuthModule,
    OAuthModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
