import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { User } from './model.users';
import { Project } from './model.projects';

@Table({ tableName: 'project-worker' })
export class ProjectWorker extends Model<ProjectWorker> {
  // @Column({ type: DataType.STRING, primaryKey: true, autoIncrement: true })
  // _id: string;

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
