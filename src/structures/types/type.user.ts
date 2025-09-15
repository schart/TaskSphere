import { Optional } from 'sequelize';
import { User } from 'src/models';

export interface InterfaceUserAttributes {
  _id: string;
  username: string;
  email: string;
  roleId?: number;
}

export interface InterfaceUserId extends Pick<InterfaceUserAttributes, '_id'> {}

export interface InterfaceUserUpdate
  extends Pick<InterfaceUserCreation, 'username'> {}

export interface InterfaceUserCreation
  extends Optional<InterfaceUserAttributes, 'roleId' | '_id'> {}

export type TypeUserModelStatic = typeof User & { new (): User };
