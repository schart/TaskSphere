import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { RepositoryUser } from 'src/repository';
import { RevokedToken, User } from 'src/models';
import { InterfaceUserEmail } from 'src/structures';
import { RepositoryAuth } from 'src/repository/repository.auth';

@Injectable()
export class ServiceAuth {
  async generateToken({ email: email }: InterfaceUserEmail): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    const payload = {
      email: email,
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
      throw new Error('Error when creating revoked token!');
    }
  }

  async checkRevokedToken(token: string): Promise<RevokedToken | null> {
    return await this.repository.findOne(token);
  }

  constructor(
    private service: JwtService,
    private repository: RepositoryAuth,
    private repositoryUser: RepositoryUser,
  ) {}
}
