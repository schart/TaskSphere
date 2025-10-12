import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'revoked-tokens' })
export class RevokedToken extends Model<RevokedToken> {
  // @Column({ type: DataType.STRING, primaryKey: true, autoIncrement: true })
  // _id: string;
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  token: string;
}
