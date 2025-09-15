import { InterfaceCredentials } from 'src/structures/types/type.auth';

export const credentials: InterfaceCredentials = {
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: `${process.env.BE_BASE_URL}/api/auth/google/callback`,
};
