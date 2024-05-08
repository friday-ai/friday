import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  DefaultScope,
  HasMany,
  Is,
  IsUUID,
  Model,
  NotEmpty,
  PrimaryKey,
  Scopes,
  Table,
  Unique,
} from "sequelize-typescript";

import type { SceneAttributes, SceneCreationAttributes } from "@friday-ai/shared";
import { isOwnerExisting } from "../utils/database/validation";
import Action from "./action";
import Trigger from "./trigger";

/**
 * Scene model
 */
@DefaultScope(() => ({
  attributes: ["id", "name", "description", "triggerId"],
}))
@Scopes(() => ({
  full: {
    attributes: ["id", "name", "description", "triggerId"],
    include: [Trigger, Action],
  },
  withActions: {
    attributes: ["id", "name", "description", "triggerId"],
    include: [Action],
  },
  withTrigger: {
    attributes: ["id", "name", "description", "triggerId"],
    include: [Trigger],
  },
}))
@Table({
  tableName: "scene",
  underscored: false,
})
export default class Scene extends Model<SceneAttributes, SceneCreationAttributes> {
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

  @Is("triggerId", async (value) => {
    if (value !== undefined) {
      await isOwnerExisting(value, ["trigger"]);
    }
  })
  @Column(DataType.UUIDV4)
  triggerId!: string;

  @BelongsTo(() => Trigger, {
    foreignKey: "triggerId",
    constraints: false,
  })
  trigger!: Trigger;

  @HasMany(() => Action, {
    foreignKey: "sceneId",
    constraints: false,
  })
  actions!: Action[];
}
