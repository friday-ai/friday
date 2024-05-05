import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  DefaultScope,
  Is,
  IsUUID,
  Model,
  NotEmpty,
  PrimaryKey,
  Scopes,
  Table,
  Unique,
} from "sequelize-typescript";

import { type ActionAttributes, type ActionCreationAttributes, ActionsType } from "@friday-ai/shared";
import { isOwnerExisting } from "../utils/database/validation";
import Scene from "./scene";

/**
 * Action model
 */
@DefaultScope(() => ({
  attributes: ["id", "name", "description", "type", "subType", "variableKey", "variableValue", "sceneId"],
}))
@Scopes(() => ({
  full: {
    attributes: ["id", "name", "description", "type", "subType", "variableKey", "variableValue", "sceneId"],
    include: [Scene],
  },
}))
@Table({
  tableName: "action",
  underscored: false,
})
export default class Action extends Model<ActionAttributes, ActionCreationAttributes> {
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
  @Column(DataType.ENUM(...Object.values(ActionsType)))
  type!: ActionsType;

  @AllowNull(false)
  @Column(DataType.STRING)
  subType!: string;

  @Column(DataType.STRING)
  variableKey!: string;

  @Column(DataType.STRING)
  variableValue!: string;

  @NotEmpty
  @Is("sceneId", (value) => isOwnerExisting(value, ["scene"]))
  @Column(DataType.UUIDV4)
  sceneId!: string;

  @BelongsTo(() => Scene, {
    foreignKey: "sceneId",
    constraints: false,
  })
  scene!: Scene;
}
