import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  DefaultScope,
  HasMany,
  HasOne,
  Is,
  IsUUID,
  Model,
  NotEmpty,
  PrimaryKey,
  Scopes,
  Table,
  Unique,
} from "sequelize-typescript";

import type { RoomAttributes, RoomCreationAttributes } from "@friday-ai/shared";
import { isOwnerExisting } from "../utils/database/validation";
import Device from "./device";
import House from "./house";
import Satellite from "./satellite";
import State from "./state";

/**
 * Room model
 */
@DefaultScope(() => ({
  attributes: ["id", "name", "houseId"],
}))
@Scopes(() => ({
  full: {
    attributes: ["id", "name", "houseId"],
    include: [House, Device, Satellite, { model: State, where: { last: true } }],
  },
  withHouse: {
    attributes: ["id", "name", "houseId"],
    include: [House],
  },
  withState: {
    attributes: ["id", "name", "houseId"],
    include: [{ model: State, where: { last: true } }],
  },
  withDevices: {
    attributes: ["id", "name", "houseId"],
    include: [Device],
  },
  withSatellites: {
    attributes: ["id", "name", "houseId"],
    include: [Satellite],
  },
}))
@Table({
  tableName: "room",
  underscored: false,
})
export default class Room extends Model<RoomAttributes, RoomCreationAttributes> {
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
  @NotEmpty
  @Is("houseId", (value) => isOwnerExisting(value, ["house"]))
  @Column(DataType.UUIDV4)
  houseId!: string;

  @BelongsTo(() => House, {
    foreignKey: "houseId",
    constraints: false,
  })
  house!: House;

  @HasMany(() => Device, {
    foreignKey: "roomId",
    constraints: false,
  })
  devices!: Device[];

  @HasMany(() => Satellite, {
    foreignKey: "roomId",
    constraints: false,
  })
  satellites!: Satellite[];

  @HasOne(() => State, {
    foreignKey: "owner",
    constraints: false,
  })
  state!: State;
}
