import {
  Get,
  Req,
  UseGuards,
  Controller,
  UnauthorizedException,
} from '@nestjs/common';
import { GuardGoogleOauth } from 'src/strategies';
import {
  GuardJwtAuth,
  GuardNoJwtTokenAuth,
  GuardShouldBeOwnerOfReq,
} from 'src/guards/guard.jwt';
import { ServiceAuth } from 'src/services/service.auth';
import { extractToken } from 'src/global/global.extract.token';

@Controller('auth/google')
export class ControllerAuth {
  @UseGuards(GuardGoogleOauth) // No Req token
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
    await this.service.revokeToken(token);

    return {
      message: 'Logout success',
    };
  }

  constructor(private readonly service: ServiceAuth) {}
}
