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
  @PrimaryKey
  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @PrimaryKey
  @ForeignKey(() => Permission)
  @Column
  permissionId: number;
}
