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

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'inProgress',
  DONE = 'done',
  REVIEW = 'review',
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task> {
  // @Column({ type: DataType.STRING, primaryKey: true, autoIncrement: true })
  // _id: string;

  @Column({ allowNull: false })
  title: string;

  @Column({ allowNull: true })
  description: string;

  @Column({
    // type: 'enum',
    values: Object.values(TaskStatus),
    allowNull: false,
    defaultValue: TaskStatus.TODO,
  })
  status: TaskStatus;

  @Column({ allowNull: false, defaultValue: false })
  locked: boolean;

  @ForeignKey(() => User)
  @Column({ allowNull: true })
  assignedWorkerId: number;

  @BelongsTo(() => User)
  assignedWorker: User;

  @ForeignKey(() => Project)
  @Column({ allowNull: false })
  projectId: number;

  @BelongsTo(() => Project)
  project: Project;
}
