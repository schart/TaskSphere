import type { Request, Response } from 'express';
import { GuardJwtAuth } from 'src/guards/guard.jwt';
import { ServiceAuth } from 'src/services/service.auth';
import { UserService } from 'src/services/service.user';
import {
  Get,
  Req,
  UseGuards,
  Controller,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { GuardGoogleOauth } from 'src/guards/guard.google';

@Controller('auth/google')
export class ControllerAuth {
  @UseGuards(GuardGoogleOauth) // No Req token
  @Get()
  async googleAuth(@Req() _req: Request) {}

  @UseGuards(GuardGoogleOauth)
  @Get('/callback')
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    try {
      if (!req['user']) {
        throw new UnauthorizedException('User not found');
      }

      const user = req['user'];
      const { access_token } = await this.serviceAuth.generateToken({
        id: user['user'].dataValues.id,
        email: user['user'].dataValues.email,
        username: user['user'].dataValues.username,
      });

      res.cookie('access_token', access_token, {
        // httpOnly: true,
        // secure: false, // while production: true
        // sameSite: 'none', // For will be able sen others sites
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.redirect('http://localhost:5173/dashboard');
    } catch (e) {
      console.log(e);
      return res.json({ isAuthenticated: false });
    }
  }

  @UseGuards(GuardJwtAuth)
  @Get('/status')
  async status(@Req() _req: Request, @Res() res: Response) {
    try {
      return res.json({
        isAuthenticated: true,
        user: _req.user,
      });
    } catch (error) {
      return res.json({ isAuthenticated: false });
    }
  }

  @UseGuards(GuardJwtAuth)
  @Get('/logout')
  async logout(@Res() res: Response, @Req() req: Request) {
    const token = req.cookies['access_token'];
    await this.serviceAuth.revokeToken(token);

    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'none',
      secure: false,
    });

    return res.json({ message: 'Logged out successfully' });
  }

  constructor(
    private readonly serviceAuth: ServiceAuth,
    // private readonly serviceUser: UserService,
  ) {}
}
