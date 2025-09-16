import { User } from 'src/models';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-google-oauth20';
import { InterfaceUserAttributes } from 'src/structures';
import { PassportStrategy } from '@nestjs/passport';
import { RepositoryUser } from 'src/repository/repository.user';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class StrategyGoogleOauth extends PassportStrategy(Strategy, 'google') {
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: Function,
  ) {
    let email: InterfaceUserAttributes = profile.emails[0].value;
    let username: string = profile.name.givenName;

    const user = await this.repository.findByEmail(email);
    if (user) {
      return done(null, { user, isNewUser: false });
    } else {
      const user: User = await this.repository.create({
        username: username,
        email: email.email,
      });
      if (!user) {
        throw new UnauthorizedException('Error occurs in registration');
      }

      return done(null, {
        user,
        isNewUser: true,
      });
    }
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
