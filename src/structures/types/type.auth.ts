import { RevokedToken } from 'src/models/model.revoked.tokens';

export interface InterfaceCredentials {
  clientID: string | undefined;
  clientSecret: string | undefined;
  callbackURL: string | undefined;
}

export interface InterfaceJwtPayload {
  id: string;
  username: string;
  email: string;
  projectId?: string;
}

export type InterfaceRevokedTokenModel = typeof RevokedToken & {
  new (): RevokedToken;
};
