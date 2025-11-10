import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { retrieveOwnerId } from 'src/global/global.parse.ownerId';
import { GuardJwtAuth, GuardGetSessionUserID } from 'src/guards/guard.jwt';
import { InvitationService } from 'src/services/service.invitation';
import { MailService } from 'src/services/service.mailer';
import { InterfaceUserId, UserEmailDto } from 'src/structures';

@Controller('mail')
export class ControllerMailer {
  constructor(
    private service: MailService,
    private serviceInvite: InvitationService,
  ) {}

  @UseGuards(GuardJwtAuth, GuardGetSessionUserID)
  @Post('/email')
  async send(@Req() req: Request, @Body() body: UserEmailDto) {
    const { _id: inviterId }: InterfaceUserId = retrieveOwnerId(req);
    const requestUser = req.user;

    return await this.service.sendEmail(
      body.email,
      inviterId,
      '<invitation link>',
    );
  }
}
