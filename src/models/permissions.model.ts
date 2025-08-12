import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { RolesPermissions } from './roles-permissions.model';
@Table
export class Permission extends Model<Permission> {
  @Column({ primaryKey: true, autoIncrement: true })
  _id: number;

  @Column({ unique: true, allowNull: false })
  name: string;

  @Column({ allowNull: true })
  description: string;

  @HasMany(() => RolesPermissions)
  rolesPermissions: RolesPermissions[];
}
