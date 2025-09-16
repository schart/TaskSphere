import { JwtService } from '@nestjs/jwt';
import { RevokedToken } from 'src/models';
import { Injectable } from '@nestjs/common';
import { RepositoryAuth } from 'src/repository/repository.auth';

@Injectable()
export class ServiceAuth {
  async generateToken(
    user: any,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = {
      email: user['user'].dataValues.email,
    };

    const access_token: string = this.service.sign(payload, {
      expiresIn: '1h',
    });
    const refresh_token: string = this.service.sign(payload, {
      expiresIn: '7d',
    });

    return { access_token, refresh_token };
  }

  async revokeToken(token: string): Promise<void> {
    const revokedToken = this.repository.create({ token: token });
    if (!revokedToken) {
      throw new Error('Error when creating revoked token');
    }
  }

  async checkRevokedToken(token: string): Promise<RevokedToken | null> {
    return await this.repository.findOne(token);
  }

  constructor(
    private service: JwtService,
    private repository: RepositoryAuth,
  ) {}
}
