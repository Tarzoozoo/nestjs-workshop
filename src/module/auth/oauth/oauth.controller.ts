import { Public } from '@/common/decorators/public.decorator';
import { Controller, Param, Query, Get } from '@nestjs/common';
import { OAuthProviderName } from './types/oauth-provider-config.type';
import { AccessToken } from '../auth.model';
import { OAuthService } from './oauth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Public()
@Controller('oauth')
@ApiTags('Provider OAuth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  // GET: retrieve the oAuth authorization URL,
  // where users are redirected to grant access
  @Get(':provider')
  @ApiOperation({ summary: 'Get OAuth authorization URL' })
  async authorize(
    @Param('provider') provider: OAuthProviderName,
  ): Promise<{ authorizationUrl: string }> {
    const response = await this.oauthService.getAuthorizationUrl(provider);
    return { authorizationUrl: response };
  }

  // GET: handle the OAuth callback after user authorization,
  // exchange the authorization code for an Google's access token,
  // then fetch the user information from the provider's API,
  // then retrieve Auth's access token
  @Get(':provider/callback')
  @ApiOperation({
    summary: "Handle OAuth callback and return system's access token",
  })
  async callback(
    @Param('provider') provider: OAuthProviderName,
    @Query('code') code: string,
  ): Promise<AccessToken> {
    const response = await this.oauthService.handleOAuthCallback(
      provider,
      code,
    );

    return response;
  }
}
