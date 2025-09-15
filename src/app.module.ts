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
import { UserController } from './controllers/controller.user';
import { RepositoryProject } from './repository/repository.project';
import { ControllerProject } from './controllers/controller.project';
import { StrategyGoogleOauth, GuardGoogleOauth } from './strategies';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'tasksphere_db',
      autoLoadModels: true,
      synchronize: true,
    }),

    SequelizeModule.forFeature([
      User,
      Task,
      Role,
      Project,
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
    RepositoryAuth,
    ServiceProject,
    RepositoryUser,
    GuardGoogleOauth,
    RepositoryProject,
    StrategyGoogleOauth,
  ],
  controllers: [ControllerAuth, UserController, ControllerProject],
})
export class AppModule {}
