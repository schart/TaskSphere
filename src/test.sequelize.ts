import { Sequelize } from 'sequelize-typescript';
import {
  User,
  Task,
  Role,
  Project,
  Permission,
  RevokedToken,
  ProjectWorker,
  RolesPermissions,
} from './models';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'tasksphere_db',
  logging: console.log,
  models: [
    User,
    Task,
    Role,
    Project,
    Permission,
    RevokedToken,
    ProjectWorker,
    RolesPermissions,
  ],
});

async function test() {
  try {
    await sequelize.authenticate();
    console.log('Connected!');
    await sequelize.sync({ force: true }); // force create all tables
    console.log('All tables created!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

test();
