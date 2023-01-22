import {
  AllowNull,
  Column,
  DataType,
  Default,
  DefaultScope,
  HasMany,
  IsUUID,
  Model,
  NotEmpty,
  PrimaryKey,
  Scopes,
  Table,
  Unique,
} from 'sequelize-typescript';

import { TriggerAttributes, AvailableConditions, TriggerCreationAttributes } from '@friday-ai/shared';
import Scene from './scene';

/**
 * Trigger model
 */
@DefaultScope(() => ({
  attributes: ['id', 'name', 'description', 'type', 'rules'],
}))
@Scopes(() => ({
  full: {
    attributes: ['id', 'name', 'description', 'type', 'rules'],
    include: [Scene],
  },
}))
@Table({
  tableName: 'trigger',
  underscored: false,
})
export default class Trigger extends Model<TriggerAttributes, TriggerCreationAttributes> {
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
  type!: AvailableConditions;

  @AllowNull(false)
  @Column(DataType.JSON)
  rules: unknown;

  @HasMany(() => Scene, {
    foreignKey: 'triggerId',
    constraints: false,
  })
  scenes!: Scene[];
}
