import {
  Table, Column, Model, PrimaryKey, DataType, IsUUID,
  AllowNull, Unique, NotEmpty, BelongsTo, DefaultScope, Default, Is,
} from 'sequelize-typescript';

import { VariableOwner } from '../utils/constants';
import User from './user';
import Plugin from './plugin';
import Satellite from './satellite';
import { isOwnerExisting } from '../utils/databaseValidation';

/**
 * Variable model
 */
@DefaultScope(() => ({
  attributes: ['id', 'key', 'value', 'owner', 'ownerType'],
}))
@Table({
  tableName: 'variable',
  underscored: false,
})
export default class Variable extends Model<Variable> {
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
  key!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  value!: string;

  @AllowNull(false)
  @NotEmpty
  @Is('owner', (value) => isOwnerExisting(value, ['user', 'satellite', 'plugin']))
  @Column(DataType.UUIDV4)
  owner!: string;

  @AllowNull(false)
  @Column
  ownerType!: VariableOwner;

  @BelongsTo(() => User, {
    foreignKey: 'owner',
    constraints: false,
  })
  user?: User;

  @BelongsTo(() => Plugin, {
    foreignKey: 'owner',
    constraints: false,
  })
  plugin?: Plugin;

  @BelongsTo(() => Satellite, {
    foreignKey: 'owner',
    constraints: false,
  })
  satellite?: Satellite;
}
