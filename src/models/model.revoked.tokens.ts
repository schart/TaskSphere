import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
  DataType,
} from 'sequelize-typescript';

@Table
export class RevokedToken extends Model<RevokedToken> {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  token: string;
}
