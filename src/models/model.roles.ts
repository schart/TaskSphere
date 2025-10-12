import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { User } from './model.users';
import { RolesPermissions } from './model.roles.permissions';

@Table({ tableName: 'roles' })
export class Role extends Model<Role> {
  // @Column({ type: DataType.STRING, primaryKey: true, autoIncrement: true })
  // _id: string;

  @Column({ unique: true, allowNull: false })
  name: string;

  @HasMany(() => User)
  users: User[];

  @HasMany(() => RolesPermissions)
  rolesPermissions: RolesPermissions[];
}
