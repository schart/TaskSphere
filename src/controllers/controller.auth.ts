import {
  Get,
  Req,
  UseGuards,
  Controller,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from 'src/services/service.auth';
import { GoogleOauthGuard } from 'src/strategies/strategy.google.oauth';
import { JwtAuthGuard, NoJwtTokenAuthGuard } from 'src/strategies/strategy.jwt';

@Controller('auth/google')
export class AuthController {
  @UseGuards(NoJwtTokenAuthGuard, GoogleOauthGuard)
  @Get()
  async googleAuth(@Req() _req: Request) {}

  @UseGuards(GoogleOauthGuard)
  @Get('/callback')
  async googleAuthRedirect(@Req() req: Request) {
    const user = req['user'];

    if (user.isNewUser == false) {
      throw new UnauthorizedException('You are logged in already');
    }

    const { access_token, refresh_token } =
      await this.authService.generateToken(user);

    return {
      ok: true,
      message: 'Success login',
      access_token: access_token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  async logout(@Req() req: Request) {
    const token = req.headers['authorization'].split(' ')[1];

    // Revoke token
    await this.authService.revokeToken(token);

    return {
      ok: true,
      message: 'Logout success',
    };
  }

  constructor(private readonly authService: AuthService) {}
}
