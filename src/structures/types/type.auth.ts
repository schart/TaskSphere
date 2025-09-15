import { RevokedToken } from 'src/models/model.revoked.tokens';

export interface InterfaceCredentials {
  clientID: string | undefined;
  clientSecret: string | undefined;
  callbackURL: string | undefined;
}

export type InterfaceRevokedTokenModel = typeof RevokedToken & {
  new (): RevokedToken;
};
