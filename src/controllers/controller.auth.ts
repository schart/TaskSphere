import {
  Get,
  Req,
  UseGuards,
  Controller,
  UnauthorizedException,
} from '@nestjs/common';
import { ServiceAuth } from 'src/services/service.auth';
import { GuardGoogleOauth } from 'src/strategies/strategy.google.oauth';
import { GuardJwtAuth, GuardNoJwtTokenAuth } from 'src/strategies/strategy.jwt';

@Controller('auth/google')
export class ControllerAuth {
  @UseGuards(GuardNoJwtTokenAuth, GuardGoogleOauth)
  @Get()
  async googleAuth(@Req() _req: Request) {}

  @UseGuards(GuardGoogleOauth)
  @Get('/callback')
  async googleAuthRedirect(@Req() req: Request) {
    const user = req['user'];

    if (user.isNewUser == false) {
      throw new UnauthorizedException('You are logged in already');
    }

    const { access_token, refresh_token } =
      await this.service.generateToken(user);

    return {
      message: 'Success login',
      access_token: access_token,
    };
  }

  @UseGuards(GuardJwtAuth)
  @Get('/logout')
  async logout(@Req() req: Request) {
    const token = req.headers['authorization'].split(' ')[1];

    // Revoke token
    await this.service.revokeToken(token);

    return {
      ok: true,
      message: 'Logout success',
    };
  }

  constructor(private readonly service: ServiceAuth) {}
}
