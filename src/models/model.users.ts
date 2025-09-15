import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Role } from './model.roles';
import { InterfaceUserCreation } from 'src/structures/types/type.user-repository';

@Table
export class User extends Model<InterfaceUserCreation> {
  @Column({ primaryKey: true, autoIncrement: true })
  _id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: true })
  roleId: number | null;

  @BelongsTo(() => Role)
  role: Role;
}
