import { oauthAccountEntitySchema } from './oauth.entity';

export const OAuthModelSchema = oauthAccountEntitySchema;
export type OAuthModel = typeof OAuthModelSchema;
