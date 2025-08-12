import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  Permission,
  Project,
  ProjectWorker,
  Role,
  RolesPermissions,
  Task,
  User,
} from './models';

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
      Role,
      Permission,
      RolesPermissions,
      Project,
      ProjectWorker,
      Task,
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
