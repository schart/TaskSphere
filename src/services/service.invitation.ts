import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class InvitationService {
  constructor(private readonly jwtService: JwtService) {}

  private logger: Logger = new Logger();

  generateInviteLinkByJwt(projectId: string, developerId: string): string {
    let inviteToken = this.jwtService.sign(
      {
        projectId: projectId,
        developerId: developerId,
      },
      { secret: process.env.JWT_SECRET },
    );

    const inviteLink: string =
      process.env.INVITE_CONFORMING_URL + '?token=' + inviteToken;

    this.logger.log(
      `[InvitationService] Generated New Invite Link: ${inviteLink}`,
    );
    return inviteLink;
  }
}
