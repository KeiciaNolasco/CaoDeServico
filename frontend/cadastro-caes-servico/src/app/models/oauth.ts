export interface OAuthResponse {
  token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  jti?: string;
}
