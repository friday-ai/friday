import {
  Table, Column, Model, PrimaryKey, DataType, BelongsTo, IsUUID,
  AllowNull, Unique, NotEmpty, DefaultScope, Scopes, Default, Is,
} from 'sequelize-typescript';

import Scene from './scene';
import { ActionsType } from '../utils/constants';
import { isOwnerExisting } from '../utils/databaseValidation';

/**
 * Action model
 */
@DefaultScope(() => ({
  attributes: ['id', 'name', 'description', 'type', 'subType', 'variableKey', 'variableValue', 'sceneId'],
}))
@Scopes(() => ({
  full: {
    attributes: ['id', 'name', 'description', 'type', 'subType', 'variableKey', 'variableValue', 'sceneId'],
    include: [Scene],
  },
}))
@Table({
  tableName: 'action',
  underscored: false,
})
export default class Action extends Model {
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

  @AllowNull(false)
  @Column
  type!: ActionsType;

  @AllowNull(false)
  @Column
  subType!: string;

  @Column
  variableKey!: string;

  @Column
  variableValue!: string;

  @NotEmpty
  @Is('sceneId', (value) => isOwnerExisting(value, ['scene']))
  @Column(DataType.UUIDV4)
  sceneId!: string;

  @BelongsTo(() => Scene, {
    foreignKey: 'sceneId',
    constraints: false,
  })
  scene!: Scene;
}
