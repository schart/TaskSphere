import {
  Column,
  Model,
  Table,
  ForeignKey,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';
import { Role } from './model.roles';
import { Permission } from './model.permissions';

@Table({ timestamps: false, tableName: 'roles-permissions' })
export class RolesPermissions extends Model<RolesPermissions> {
  // @Column({ type: DataType.STRING, primaryKey: true, autoIncrement: true })
  // _id: string;

  @PrimaryKey
  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @PrimaryKey
  @ForeignKey(() => Permission)
  @Column
  permissionId: number;
}
