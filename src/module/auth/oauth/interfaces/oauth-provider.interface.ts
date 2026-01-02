import { OAuthUser } from '../types/oauth-user.type';

// Interface for OAuth providers wll following this method
export interface OAuthProviderInterface {

  // Generates the OAuth2 authorization URL where users are redirected to grant permissions
  authorize(): string;

  // Handle the OAuth callback after user authorization,
  // exchange the authorization code for an Google's access token,
  // then fetch the user information from the provider's API,
  // then retrieve Auth's access token
  callback(code: string): Promise<OAuthUser>;
  getProviderName(): string;
}
