import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { Role } from './model.roles';
import { InterfaceUserCreation } from 'src/structures/types/type.user';
import { Project } from './model.projects';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  // @Column({ type: DataType.STRING, primaryKey: true, autoIncrement: true })
  // _id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: true })
  roleId: number | null;

  @HasOne(() => Project)
  project: Project;
  
  @BelongsTo(() => Role)
  role: Role;
  length: any;
}
