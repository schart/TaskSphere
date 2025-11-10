import { Optional } from 'sequelize';
import { User } from 'src/models';

export type TypeuserId = number;

export interface InterfaceUserAttributes {
  _id: TypeuserId;
  username: string;
  email: string;
  roleId?: number;
  loggedIn?: boolean;
}

export interface InterfaceUserId extends Pick<InterfaceUserAttributes, '_id'> {}
export interface InterfaceUserEmail
  extends Pick<InterfaceUserAttributes, 'email'> {}

export interface InterfaceUserUpdate
  extends Pick<InterfaceUserCreation, 'username'> {}

export interface InterfaceUserCreation
  extends Optional<InterfaceUserAttributes, 'roleId' | '_id'> {}

export type TypeUserModelStatic = typeof User & { new (): User };
