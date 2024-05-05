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
} from "sequelize-typescript";

import { AvailableConditions, type TriggerAttributes, type TriggerCreationAttributes } from "@friday-ai/shared";
import Scene from "./scene";

/**
 * Trigger model
 */
@DefaultScope(() => ({
  attributes: ["id", "name", "description", "type", "rules"],
}))
@Scopes(() => ({
  full: {
    attributes: ["id", "name", "description", "type", "rules"],
    include: [Scene],
  },
}))
@Table({
  tableName: "trigger",
  underscored: false,
})
export default class Trigger extends Model<TriggerAttributes, TriggerCreationAttributes> {
  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Unique
  @Default(DataType.UUIDV4)
  @Column(DataType.UUIDV4)
  id!: string;

  @AllowNull(false)
  @Unique
  @NotEmpty
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string;

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(AvailableConditions)))
  type!: AvailableConditions;

  @AllowNull(false)
  @Column(DataType.JSON)
  rules: unknown;

  @HasMany(() => Scene, {
    foreignKey: "triggerId",
    constraints: false,
  })
  scenes!: Scene[];
}
