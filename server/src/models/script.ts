import {
  AllowNull,
  Column,
  DataType,
  Default,
  DefaultScope,
  IsUUID,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

/**
 * Script model
 */
@DefaultScope(() => ({
  attributes: ['id', 'name', 'code'],
}))
@Table({
  tableName: 'script',
  underscored: false,
})
export default class Script extends Model {
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
  @Default('')
  @Column
    code!: string;
}
