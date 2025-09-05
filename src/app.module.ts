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
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers';
import { GoogleOauthStrategy, GoogleOauthGuard } from './strategies';
import { UserRepository } from './repository';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RevokedTokenRepository } from './repository/user.repository/revoked-token.repository';

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
    JwtStrategy,
    AuthService,
    UserRepository,
    GoogleOauthGuard,
    GoogleOauthStrategy,
    RevokedTokenRepository,
  ],
  controllers: [AuthController],
})
export class AppModule {}
