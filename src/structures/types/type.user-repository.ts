import { Optional } from 'sequelize';
import { User } from 'src/models';

export interface UserAttributes {
  _id: number;
  username: string;
  email: string;
  roleId?: number;
}

export interface UserUpdateAttributes
  extends Pick<UserCreationAttributes, 'username'> {}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'roleId' | '_id'> {}

export type UserModelStatic = typeof User & { new (): User };
