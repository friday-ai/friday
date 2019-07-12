import { Table, Column, Model, PrimaryKey, DataType, IsUUID, AllowNull, Unique, NotEmpty, DefaultScope } from 'sequelize-typescript';

@DefaultScope({
  attributes: ['id', 'name', 'code']
})
@Table({
  tableName: 'script',
  underscored: true
})
export default class Script extends Model<Script> {

  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Unique
  @Column({ type: DataType.UUIDV4 })
  id!: string;

  @AllowNull(false)
  @Unique
  @NotEmpty
  @Column
  name!: string;

  @AllowNull(false)
  @Column(DataType.JSON)
  code: any;
}
