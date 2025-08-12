import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { User } from './users.model';
import { RolesPermissions } from './roles-permissions.model';

@Table
export class Role extends Model<Role> {
  @Column({ primaryKey: true, autoIncrement: true })
  _id: number;

  @Column({ unique: true, allowNull: false })
  name: string;

  @HasMany(() => User)
  users: User[];

  @HasMany(() => RolesPermissions)
  rolesPermissions: RolesPermissions[];
}
