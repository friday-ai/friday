import {
  AllowNull,
  BeforeCreate,
  Column,
  DataType,
  Default,
  DefaultScope,
  HasMany,
  HasOne,
  IsEmail,
  IsUUID,
  Length,
  Model,
  NotEmpty,
  PrimaryKey,
  Scopes,
  Table,
  Unique,
} from "sequelize-typescript";

import { AvailableLanguages, type UserAttributes, type UserCreationAttributes, UserRole } from "@friday-ai/shared";
import { hash } from "../utils/password";
import Session from "./session";
import State from "./state";
import Variable from "./variable";

/**
 * User model
 */
@DefaultScope(() => ({
  attributes: ["id", "userName", "email", "theme", "role", "language"],
}))
@Scopes(() => ({
  full: {
    attributes: ["id", "userName", "email", "theme", "role", "language"],
    include: [Variable, { model: State, where: { last: true } }],
  },
  withState: {
    attributes: ["id", "userName", "email", "theme", "role", "language"],
    include: [{ model: State, where: { last: true } }],
  },
  withVariables: {
    attributes: ["id", "userName", "email", "theme", "role", "language"],
    include: [Variable],
  },
}))
@Table({
  tableName: "user",
  underscored: false,
})
export default class User extends Model<UserAttributes, UserCreationAttributes> {
  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Unique
  @Default(DataType.UUIDV4)
  @Column(DataType.UUIDV4)
  id!: string;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING)
  userName!: string;

  @AllowNull(false)
  @Unique
  @IsEmail
  @NotEmpty
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Length({ min: 10 })
  @NotEmpty
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  theme!: string;

  @AllowNull(false)
  @Default(UserRole.HABITANT)
  @Column(DataType.ENUM(...Object.values(UserRole)))
  role!: UserRole;

  @AllowNull(false)
  @Default(AvailableLanguages.EN)
  @Column(DataType.ENUM(...Object.values(AvailableLanguages)))
  language!: AvailableLanguages;

  @HasMany(() => Variable, {
    foreignKey: "owner",
    constraints: false,
  })
  variables?: Variable[];

  @HasOne(() => State, {
    foreignKey: "owner",
    constraints: false,
  })
  state?: State;

  @HasMany(() => Session, {
    foreignKey: "userId",
    constraints: false,
  })
  session?: Session[];

  /**
   * Function to hash password before saving in the database
   */
  @BeforeCreate
  static async hashPassword(user: User) {
    user.password = await hash(user.password);
  }
}
