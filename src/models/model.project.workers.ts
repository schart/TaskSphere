import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './model.users';
import { Project } from './model.projects';

@Table
export class ProjectWorker extends Model<ProjectWorker> {
  @Column({ primaryKey: true, autoIncrement: true })
  _id: number;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  workerId: number;

  @BelongsTo(() => User)
  worker: User;

  @ForeignKey(() => Project)
  @Column({ allowNull: false })
  projectId: number;

  @BelongsTo(() => Project)
  project: Project;
}
