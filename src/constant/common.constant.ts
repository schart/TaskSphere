import { CredentialsInterface } from 'src/types/type.auth';

export const credentials: CredentialsInterface = {
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: `${process.env.BE_BASE_URL}/api/auth/google/callback`,
};
