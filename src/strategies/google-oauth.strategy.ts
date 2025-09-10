import { User } from 'src/models';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-google-oauth20';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private readonly _userRepository: UserRepository,
  ) {
    super({
      clientID: configService.get<string>('OAUTH_GOOGLE_ID')!,
      clientSecret: configService.get<string>('OAUTH_GOOGLE_SECRET')!,
      callbackURL: configService.get<string>('OAUTH_GOOGLE_REDIRECT_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: Function,
  ) {
    let email: string, username: string;
    email = profile.emails[0].value;
    username = profile.name.givenName;

    /**
     * Check user existence
      - If that exists report "already registered" 
     * Create user 
     **/

    const user = await this._userRepository.findByEmail(email);
    if (user) {
      return done(null, { user, isNewUser: false });
    } else {
      const user: User = await this._userRepository.create({
        username: username,
        email: email,
      });
      if (!user) {
        throw new UnauthorizedException('Error occurs in registration');
      }

      return done(null, {
        user: user,
        isNewUser: true,
      });
    }
  }
}

export class GoogleOauthGuard extends AuthGuard('google') {}
