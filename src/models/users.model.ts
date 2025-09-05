import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Role } from './roles.model';
import { UserCreationAttributes } from 'src/types/type.user-repository';

@Table
export class User extends Model<UserCreationAttributes> {
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
