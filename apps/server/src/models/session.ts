import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  DefaultScope,
  Is,
  IsDate,
  IsUUID,
  Model,
  NotEmpty,
  PrimaryKey,
  Scopes,
  Table,
  Unique,
} from 'sequelize-typescript';

import { SessionAttributes, SessionCreationAttributes } from '@friday-ai/shared';
import { isOwnerExisting } from '../utils/database/validation';
import User from './user';

/**
 * Session model
 */
@DefaultScope(() => ({
  attributes: ['id', 'refreshToken', 'revoked', 'userAgent', 'validUntil', 'userId', 'createdAt'],
}))
@Scopes(() => ({
  full: {
    attributes: ['id', 'refreshToken', 'revoked', 'userAgent', 'validUntil', 'userId', 'createdAt'],
    include: [User],
  },
}))
@Table({
  tableName: 'session',
  underscored: false,
})
export default class Session extends Model<SessionAttributes, SessionCreationAttributes> {
  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Unique
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUIDV4 })
  id!: string;

  @AllowNull(false)
  @Unique
  @NotEmpty
  @Column
  refreshToken!: string;

  @AllowNull(false)
  @Default(false)
  @Column
  revoked!: boolean;

  @Column
  userAgent!: string;

  @AllowNull(false)
  @NotEmpty
  @IsDate
  @Column({ type: DataType.DATE })
  validUntil!: Date;

  @NotEmpty
  @Is('userId', (value) => isOwnerExisting(value, ['user']))
  @Column(DataType.UUIDV4)
  userId!: string;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
    constraints: false,
  })
  user!: User;
}
