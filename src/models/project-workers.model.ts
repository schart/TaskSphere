import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './users.model';
import { Project } from './projects.model';

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
