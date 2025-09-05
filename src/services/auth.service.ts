import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RevokedToken, User } from 'src/models';
import { RevokedTokenRepository } from 'src/repository/revoked-token.repository';

@Injectable()
export class AuthService {
  async generateToken(
    user: User,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = {
      email: user.email,
    };

    const access_token = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { access_token, refresh_token };
  }

  async revokeToken(token: string): Promise<void> {
    const revokedToken = this.revokedTokenRepository.create({ token: token });
    if (!revokedToken) {
      throw new Error('Error when creating revoked token');
    }
  }

  async checkRevokedToken(token: string): Promise<RevokedToken | null> {
    return await this.revokedTokenRepository.findOne(token);
  }

  constructor(
    private jwtService: JwtService,
    private revokedTokenRepository: RevokedTokenRepository,
  ) {}
}
