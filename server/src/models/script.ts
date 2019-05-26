import { Table, Column, Model, PrimaryKey, DataType, IsUUID, AllowNull } from 'sequelize-typescript';

@Table({
  tableName: 'script',
  underscored: true
})
export default class Script extends Model<Script> {

  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Column({type: DataType.INTEGER})
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @Column(DataType.JSON)
  code: any;
}
