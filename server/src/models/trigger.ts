import { Table, Column, Model, PrimaryKey, HasMany, DataType, IsUUID, AllowNull, Unique, NotEmpty, DefaultScope } from 'sequelize-typescript';
import Scene from './scene';

@DefaultScope({
  include: [() => Scene]
})
@Table({
  tableName: 'trigger',
  underscored: false
})
export default class Trigger extends Model<Trigger> {

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
  @Column
  description!: string;

  @AllowNull(false)
  @Column
  type!: string;

  @AllowNull(false)
  @Column(DataType.JSON)
  rules: any;

  @HasMany(() => Scene)
  scenes!: Scene[];

}
