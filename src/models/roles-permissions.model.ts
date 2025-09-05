import {
  Column,
  Model,
  Table,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript';
import { Role } from './roles.model';
import { Permission } from './permissions.model';

@Table({ timestamps: false })
export class RolesPermissions extends Model<RolesPermissions> {
  @Column({ primaryKey: true, autoIncrement: true })
  _id: number;

  @PrimaryKey
  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @PrimaryKey
  @ForeignKey(() => Permission)
  @Column
  permissionId: number;
}
