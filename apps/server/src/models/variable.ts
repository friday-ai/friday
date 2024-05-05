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
  Table,
  Unique,
} from "sequelize-typescript";

import { type VariableAttributes, type VariableCreationAttributes, VariableOwner } from "@friday-ai/shared";
import { isOwnerExisting } from "../utils/database/validation";
import Plugin from "./plugin";
import Satellite from "./satellite";
import User from "./user";

/**
 * Variable model
 */
@DefaultScope(() => ({
  attributes: ["id", "key", "value", "owner", "ownerType"],
}))
@Table({
  tableName: "variable",
  underscored: false,
})
export default class Variable extends Model<VariableAttributes, VariableCreationAttributes> {
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
  key!: string;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING)
  value!: string;

  @AllowNull(false)
  @NotEmpty
  @Is("owner", (value) => isOwnerExisting(value, ["user", "satellite", "plugin"]))
  @Column(DataType.UUIDV4)
  owner!: string;

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(VariableOwner)))
  ownerType!: VariableOwner;

  @BelongsTo(() => User, {
    foreignKey: "owner",
    constraints: false,
  })
  user?: User;

  @BelongsTo(() => Plugin, {
    foreignKey: "owner",
    constraints: false,
  })
  plugin?: Plugin;

  @BelongsTo(() => Satellite, {
    foreignKey: "owner",
    constraints: false,
  })
  satellite?: Satellite;
}
