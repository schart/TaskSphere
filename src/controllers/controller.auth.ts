import type { Response } from 'express';
import { GuardGoogleOauth } from 'src/strategies';
import { GuardJwtAuth } from 'src/guards/guard.jwt';
import { InterfaceUserEmail } from 'src/structures';
import { ServiceAuth } from 'src/services/service.auth';
import { UserService } from 'src/services/service.user';
import { FRONT_END_URL } from 'src/constant/constant.urls';
import { extractToken } from 'src/global/global.extract.token';
import { Get, Req, UseGuards, Controller, Res } from '@nestjs/common';

@Controller('auth/google')
export class ControllerAuth {
  @UseGuards(GuardGoogleOauth) // No Req token
  @Get()
  async googleAuth(@Req() _req: Request) {}

  @UseGuards(GuardGoogleOauth)
  @Get('/callback')
  async googleAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { user } = req['user'];
      // const isNewUser = req['user'].isNewUser;

      const email: InterfaceUserEmail = { email: user.dataValues.email };
      const { access_token } = await this.serviceAuth.generateToken(email);

      return res.redirect(
        `${FRONT_END_URL}auth/callback?token=${access_token}`,
      );
    } catch (error) {
      console.error('Google callback error:', error);
      throw error;
    }
  }

  @UseGuards(GuardJwtAuth)
  @Get('/logout')
  async logout(@Req() req: Request) {
    try {
      const user = req['user'];
      // let email: InterfaceUserEmail = { email: user['email'] };
      // await this.serviceAuth.updateLoggedIn(email, false);

      const token: string = extractToken(req.headers['authorization']);
      await this.serviceAuth.revokeToken(token);

      return { message: 'Logged out successfully' };
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  constructor(
    private readonly serviceAuth: ServiceAuth,
    private readonly serviceUser: UserService,
  ) {}
}
