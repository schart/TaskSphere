import {
  Get,
  Req,
  UseGuards,
  Controller,
  UnauthorizedException,
} from '@nestjs/common';
import { ServiceAuth } from 'src/services/service.auth';
import { GuardGoogleOauth } from 'src/guards/guard.google';
import { extractToken } from 'src/global/global.extract.token';
import { GuardNoJwtTokenAuth, GuardJwtAuth } from 'src/guards/guard.jwt';

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
    const token: string = extractToken(req.headers['authorization']);

    // Revoke token
    await this.service.revokeToken(token);

    return {
      message: 'Logout success',
    };
  }

  constructor(private readonly service: ServiceAuth) {}
}
