import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ProjectWorker } from './project-workers.model';
import { User } from './users.model';
import { Task } from './tasks.model';

@Table
export class Project extends Model<Project> {
  @Column({ primaryKey: true, autoIncrement: true })
  _id: number;

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
