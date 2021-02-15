import {
  Table, Column, Model, PrimaryKey, HasMany, DataType, IsUUID,
  AllowNull, Unique, NotEmpty, DefaultScope, Scopes, Default,
} from 'sequelize-typescript';

import Scene from './scene';
import { AvailableConditions } from '../utils/constants';

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
export default class Trigger extends Model {
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
  rules: any;

  @HasMany(() => Scene, {
    foreignKey: 'triggerId',
    constraints: false,
  })
  scenes!: Scene[];
}
