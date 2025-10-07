import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { RolesPermissions } from './model.roles.permissions';

@Table({ tableName: 'permissions' })
export class Permission extends Model<Permission> {
  // @Column({ type: DataType.STRING, primaryKey: true, autoIncrement: true })
  // _id: string;

  @Column({ unique: true, allowNull: false })
  name: string;

  @Column({ allowNull: true })
  description: string;

  @HasMany(() => RolesPermissions)
  rolesPermissions: RolesPermissions[];
}
