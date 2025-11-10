import { Module } from '@nestjs/common';
import {
  Permission,
  Project,
  ProjectWorker,
  RevokedToken,
  Role,
  RolesPermissions,
  Task,
  User,
} from './models';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ControllerAuth } from './controllers';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './services/service.user';
import { ServiceAuth } from './services/service.auth';
import { StrategyJwt } from './strategies/strategy.jwt';
import { ServiceProject } from './services/service.project';
import { RepositoryAuth, RepositoryUser } from './repository';
import { ControllerUser } from './controllers/controller.user';
import { RepositoryProject } from './repository/repository.project';
import { ControllerProject } from './controllers/controller.project';
import { StrategyGoogleOauth } from './strategies';
import { MailerModule } from '@nestjs-modules/mailer';
import { GuardGoogleOauth } from './guards/guard.google';
import { ControllerMailer } from './controllers/controller.mailer';
import { MailService } from './services/service.mailer';
import { InvitationService } from './services/service.invitation';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: '',
          port: 1111,
          secure: false, // In production: true

          tls: {
            rejectUnauthorized: false,
          },
        },
        defaults: {
          from: 'innalcuzdan1@gmail.com',
        },
      }),
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'tasksphere_db',
      synchronize: true,
      logging: true, // enable logging to see errors
      models: [
        Task,
        Role,
        Project,
        User,
        Permission,
        RevokedToken,
        ProjectWorker,
        RolesPermissions,
      ],
    }),

    SequelizeModule.forFeature([
      Task,
      Role,
      Project,
      User,
      Permission,
      RevokedToken,
      ProjectWorker,
      RolesPermissions,
    ]),

    ConfigModule.forRoot({
      envFilePath: '.env',
    }),

    PassportModule.register({ session: false }),

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],

  providers: [
    StrategyJwt,
    ServiceAuth,
    UserService,
    MailService,
    RepositoryAuth,
    ServiceProject,
    RepositoryUser,
    GuardGoogleOauth,
    RepositoryProject,
    StrategyGoogleOauth,
    InvitationService,
  ],

  controllers: [
    ControllerAuth,
    ControllerUser,
    ControllerProject,
    ControllerMailer,
  ],
})
export class AppModule {}
