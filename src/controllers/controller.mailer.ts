import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { NotFoundError } from 'rxjs';
import { retrieveOwnerId } from 'src/global/global.parse.ownerId';
import { GuardJwtAuth, GuardGetSessionUserID } from 'src/guards/guard.jwt';
import { InvitationService } from 'src/services/service.invitation';
import { MailService } from 'src/services/service.mailer';
import { ServiceProject } from 'src/services/service.project';
import { UserService } from 'src/services/service.user';
import { InterfaceUserId, UserEmailDto } from 'src/structures';

@Controller('mail')
export class ControllerMailer {
  constructor(
    private service: MailService,
    private serviceProject: ServiceProject,
    private serviceUser: UserService,
    private serviceInvite: InvitationService,
  ) {}

  @UseGuards(GuardJwtAuth, GuardGetSessionUserID)
  @Post('/email')
  async send(
    @Req() req: Request,
    @Body() developerEmail: UserEmailDto, // Developer email
  ) {
    const { _id: inviterId }: InterfaceUserId = retrieveOwnerId(req);
    const invitorProject = await this.serviceProject.getProjectByUserId({
      _id: inviterId,
    });

    const developer = await this.serviceUser.getUserByEmail(developerEmail);
    const generatedInvitationLink = this.serviceInvite.generateInviteLinkByJwt(
      invitorProject.id,
      developer.id,
    );

    return await this.service.sendEmail(
      developerEmail.email,
      generatedInvitationLink,
    );
  }
}
