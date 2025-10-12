import { User } from 'src/models';
import { Strategy } from 'passport-google-oauth20';
import { InterfaceUserEmail } from 'src/structures';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { RepositoryUser } from 'src/repository/repository.user';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StrategyGoogleOauth extends PassportStrategy(Strategy, 'google') {
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: Function,
  ) {
    let email: InterfaceUserEmail = { email: profile.emails[0].value };
    let username: string = profile.name.givenName;

    let user = await this.repository.findByEmail(email);
    if (!user) {
      user = await this.repository.create({
        username: username,
        email: email.email,
      });
      if (!user) throw new UnauthorizedException('User creation failed');
    }
    return done(null, { user });
  }

  constructor(
    config: ConfigService,
    private readonly repository: RepositoryUser,
  ) {
    super({
      clientID: config.get<string>('OAUTH_GOOGLE_ID')!,
      clientSecret: config.get<string>('OAUTH_GOOGLE_SECRET')!,
      callbackURL: config.get<string>('OAUTH_GOOGLE_REDIRECT_URL'),
      scope: ['email', 'profile'],
    });
  }
}
export class GuardGoogleOauth extends AuthGuard('google') {}
