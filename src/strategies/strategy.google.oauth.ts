import { User } from 'src/models';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-google-oauth20';
import { InterfaceUserAttributes, InterfaceUserEmail } from 'src/structures';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
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
    let email: InterfaceUserEmail = { email: profile.emails[0].value };
    let username: string = profile.name.givenName;
    console.log('sss', email);

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
    // config: ConfigService,
    private readonly repository: RepositoryUser,
  ) {
    super({
      clientID:
        '954798339847-4benmcek7d0sbep283jvqra3l75h81l4.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }
}
export class GuardGoogleOauth extends AuthGuard('google') {}
