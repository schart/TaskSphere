import { Optional } from 'sequelize';
import { User } from 'src/models';

export interface UserAttributes {
  username: string;
  email: string;
  roleId?: number;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'roleId'> {}

export type UserModelStatic = typeof User & { new (): User };
