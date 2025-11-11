import { TypeuserId } from 'src/structures';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EMAIL_TEMPLATES } from 'src/constant/constant.email';
import { fillTemplate } from 'src/global/global.fill.template';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailerService.name);
  private transporter: any;

  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get<string>('SMTP_HOST'),
      port: this.config.get<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.config.get<string>('SMTP_USER'),
        pass: this.config.get<string>('SMTP_PASS'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendEmail(developerEmail: string, invitationLink: string) {
    try {
      const user = {
        email: developerEmail,
        invitationLink: invitationLink,
      };

      const subject = fillTemplate(EMAIL_TEMPLATES.INVITATION.subject, user);
      const text = fillTemplate(EMAIL_TEMPLATES.INVITATION.text, user);

      await this.transporter.sendMail({
        from: this.config.get<string>('SENDER_EMAIL'),
        to: developerEmail,
        subject,
        text,
      });
    } catch (e) {
      this.logger.error(`[Mail Service] Error when send mail: ${e.message}`);
      throw new Error('[Mail Service]: Error when send mail');
    }
  }
}
