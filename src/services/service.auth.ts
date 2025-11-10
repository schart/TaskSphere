import { JwtService } from '@nestjs/jwt';
import { Injectable, Logger } from '@nestjs/common';
import { RepositoryUser } from 'src/repository';
import { RevokedToken, User } from 'src/models';
import { InterfaceJwtPayload, InterfaceUserEmail } from 'src/structures';
import { RepositoryAuth } from 'src/repository/repository.auth';

@Injectable()
export class ServiceAuth {
  private logger: Logger = new Logger();

  async generateToken({
    id: id,
    email: email,
    username: username,
    projectId: projectId,
  }: InterfaceJwtPayload): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    try {
      const payload = {
        id: id,
        email: email,
        username: username,
        projectId: projectId,
      };

      const access_token: string = this.service.sign(payload, {
        expiresIn: '1h',
      });
      const refresh_token: string = this.service.sign(payload, {
        expiresIn: '7d',
      });

      this.logger.log(
        `[Service Auth (generate-token)] New Token: ${access_token}`,
      );

      return { access_token, refresh_token };
    } catch {
      throw new Error('Error when generating token!');
    }
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
  ) {}
}
