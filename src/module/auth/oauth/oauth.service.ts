import { Injectable } from '@nestjs/common';
import { OAuthRepository } from './oauth.repository';
import { AuthService } from '../auth.service';
import { OAuthProviderName } from './types/oauth-provider-config.type';
import { OAuthProviderFactory } from './providers/oauth.provider.factory';
import { AccessToken } from '../auth.model';
import { OAuthUser } from './types/oauth-user.type';
import { OAuthAccountInsertEntity } from './oauth.entity';
import { AuthModel } from '../auth.model';

@Injectable()
export class OAuthService {
  constructor(
    private readonly oauthRepository: OAuthRepository,
    private readonly authService: AuthService,
    private readonly oauthProviderFactory: OAuthProviderFactory,
  ) {}

  async getAuthorizationUrl(provider: OAuthProviderName): Promise<string> {
    return this.oauthProviderFactory.getProvider(provider).authorize(); // method chaining
  }

  async handleOAuthCallback(
    providerName: OAuthProviderName,
    code: string,
  ): Promise<AccessToken> {
    const provider = this.oauthProviderFactory.getProvider(providerName);
    const oauthUser = await provider.callback(code);
    const user = await this.handleOAuthLogin(providerName, oauthUser);
    return this.authService.login(user);
  }

  private async handleOAuthLogin(
    provider: OAuthProviderName,
    oauthUser: OAuthUser,
  ): Promise<AuthModel> {
    const oauthAccount = await this.oauthRepository.find(
      provider,
      oauthUser.id,
    );

    if (oauthAccount) {
      const response: AuthModel = {
        id: oauthAccount.userID,
        name: oauthUser.firstName + ' ' + oauthUser.lastName,
        email: oauthUser.email,
        password: 'null',
        isOAuthUser: 'true',
        tel: 'null',
        createdAt: oauthAccount.createdAt,
      };
      return response;
    }

    let user = await this.authService.findAuthOneByEmail(oauthUser.email);

    if (!user) {
      user = await this.authService.registerFromOauthUser(oauthUser);
    }

    const oauthNewAccount: OAuthAccountInsertEntity = {
      userID: user.id,
      provider,
      providerID: oauthUser.id,
      email: oauthUser.email,
    };
    await this.oauthRepository.create(oauthNewAccount);

    return user;
  }
}
