import { Module } from '@nestjs/common';
import { AuthModule } from '../auth.module';
import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';
import { OAuthRepository } from './oauth.repository';
import { GoogleOAuthProvider } from './providers/google-oauth.provider';
import { OAuthProviderFactory } from './providers/oauth.provider.factory';

@Module({
  imports: [AuthModule],
  controllers: [OAuthController],
  providers: [
    OAuthService,
    OAuthRepository,
    GoogleOAuthProvider,
    OAuthProviderFactory,
  ],
})
export class OAuthModule {}
