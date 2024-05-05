import {
  AllowNull,
  Column,
  DataType,
  Default,
  DefaultScope,
  HasMany,
  HasOne,
  IsUUID,
  Model,
  NotEmpty,
  PrimaryKey,
  Scopes,
  Table,
  Unique,
} from "sequelize-typescript";

import type { HouseAttributes, HouseCreationAttributes } from "@friday-ai/shared";

import Room from "./room";
import State from "./state";

/**
 * House model
 */
@DefaultScope(() => ({
  attributes: ["id", "name", "latitude", "longitude"],
}))
@Scopes(() => ({
  full: {
    attributes: ["id", "name", "latitude", "longitude"],
    include: [Room, { model: State, where: { last: true } }],
  },
  withRooms: {
    attributes: ["id", "name", "latitude", "longitude"],
    include: [Room],
  },
  withState: {
    attributes: ["id", "name", "latitude", "longitude"],
    include: [{ model: State, where: { last: true } }],
  },
}))
@Table({
  tableName: "house",
  underscored: false,
})
export default class House extends Model<HouseAttributes, HouseCreationAttributes> {
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
  latitude!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  longitude!: string;

  @HasMany(() => Room, {
    foreignKey: "houseId",
    constraints: false,
  })
  rooms!: Room[];

  @HasOne(() => State, {
    foreignKey: "owner",
    constraints: false,
  })
  state!: State;
}
