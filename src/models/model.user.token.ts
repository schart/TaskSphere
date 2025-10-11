import { Model } from 'sequelize';
import {
  Column,
  DataType,
  Default,
  ForeignKey,
  Table,
} from 'sequelize-typescript';

interface UserTokenAttributes {
  user_id?: string;
  access_token?: string;
  revoked?: boolean;
  expires_at?: Date;
}

@Table({ tableName: 'user-tokens' })
export class UserToken extends Model<UserTokenAttributes, UserTokenAttributes> {
  @Column({ allowNull: true })
  user_id: string;

  @Column({ type: DataType.STRING, allowNull: true })
  access_token: string;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  revoked: boolean;

  @Column({ type: DataType.DATE, allowNull: true })
  expires_at: Date;
}
