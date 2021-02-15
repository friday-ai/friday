import {
  Table, Column, Model, PrimaryKey, DataType, BelongsTo, HasMany, IsUUID, AllowNull,
  NotEmpty, Unique, DefaultScope, Scopes, Default, Is,
} from 'sequelize-typescript';

import Trigger from './trigger';
import Action from './action';
import { isOwnerExisting } from '../utils/databaseValidation';

/**
 * Scene model
 */
@DefaultScope(() => ({
  attributes: ['id', 'name', 'description', 'triggerId'],
}))
@Scopes(() => ({
  full: {
    attributes: ['id', 'name', 'description', 'triggerId'],
    include: [Trigger, Action],
  },
  withActions: {
    attributes: ['id', 'name', 'description', 'triggerId'],
    include: [Action],
  },
  withTrigger: {
    attributes: ['id', 'name', 'description', 'triggerId'],
    include: [Trigger],
  },
}))
@Table({
  tableName: 'scene',
  underscored: false,
})
export default class Scene extends Model {
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
  name!: string;

  @AllowNull(false)
  @Column
  description!: string;

  @Is('triggerId', async (value) => {
    if (value !== undefined) {
      await isOwnerExisting(value, ['trigger']);
    }
  })
  @Column(DataType.UUIDV4)
  triggerId!: string;

  @BelongsTo(() => Trigger, {
    foreignKey: 'triggerId',
    constraints: false,
  })
  trigger!: Trigger;

  @HasMany(() => Action, {
    foreignKey: 'sceneId',
    constraints: false,
  })
  actions!: Action[];
}
