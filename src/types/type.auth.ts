import { RevokedToken } from 'src/models/revoked-tokens.model';

export interface CredentialsInterface {
  clientID: string | undefined;
  clientSecret: string | undefined;
  callbackURL: string | undefined;
}

export type RevokedTokenModelStatic = typeof RevokedToken & {
  new (): RevokedToken;
};
