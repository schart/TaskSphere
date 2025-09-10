import {
  Permission,
  Project,
  ProjectWorker,
  RevokedToken,
  Role,
  RolesPermissions,
  Task,
  User,
} from 'src/models';

export type Models =
  | Permission
  | Project
  | ProjectWorker
  | RevokedToken
  | Role
  | RolesPermissions
  | Task
  | User;
