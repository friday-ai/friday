import {
  Table, Column, Model, PrimaryKey, DataType, BelongsTo, IsUUID, AllowNull,
  Unique, NotEmpty, DefaultScope, Scopes, Default, IsDate, Is,
} from 'sequelize-typescript';

import User from './user';
import { isOwnerExisting } from '../utils/databaseValidation';

/**
 * Session model
 */
@DefaultScope(() => ({
  attributes: ['id', 'refreshToken', 'revoked', 'validUntil', 'userId'],
}))
@Scopes(() => ({
  full: {
    attributes: ['id', 'refreshToken', 'revoked', 'validUntil', 'userId'],
    include: [User],
  },
}))
@Table({
  tableName: 'session',
  underscored: false,
})
export default class Session extends Model<Session> {
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
