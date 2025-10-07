import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
  DataType,
} from 'sequelize-typescript';
import { ProjectWorker } from './model.project.workers';
import { User } from './model.users';
import { Task } from './model.tasks';

@Table({ tableName: 'projects' })
export class Project extends Model<Project> {
  // @Column({ type: DataType.STRING, primaryKey: true, autoIncrement: true })
  // _id: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  ownerId: number;

  @BelongsTo(() => User)
  owner: User;

  @Column({ allowNull: false })
  title: string;

  @Column({ allowNull: true })
  description: string;

  @HasMany(() => ProjectWorker)
  workers: ProjectWorker[];

  @HasMany(() => Task)
  tasks: Task[];
}
