import { AllowNull, Column, DataType, Default, DefaultScope, IsUUID, Model, NotEmpty, PrimaryKey, Table, Unique } from "sequelize-typescript";

import type { ScriptAttributes, ScriptCreationAttributes } from "@friday-ai/shared";

/**
 * Script model
 */
@DefaultScope(() => ({
  attributes: ["id", "name", "code"],
}))
@Table({
  tableName: "script",
  underscored: false,
})
export default class Script extends Model<ScriptAttributes, ScriptCreationAttributes> {
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
  @Default("")
  @Column(DataType.STRING)
  code!: string;
}
