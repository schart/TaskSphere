import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Role } from './model.roles';
import { InterfaceUserCreation } from 'src/structures/types/type.user';

@Table({ tableName: 'users' })
export class User extends Model<InterfaceUserCreation> {
  // @Column({ type: DataType.STRING, primaryKey: true, autoIncrement: true })
  // _id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  // @Column({ type: DataType.BOOLEAN })
  // loggedIn: boolean;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: true })
  roleId: number | null;

  @BelongsTo(() => Role)
  role: Role;
}
