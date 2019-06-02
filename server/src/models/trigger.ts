import { Table, Column, Model, PrimaryKey, HasMany, DataType, IsUUID, AllowNull } from 'sequelize-typescript';
import Scene from './scene';

@Table({
  tableName: 'trigger',
  underscored: true
})
export default class Trigger extends Model<Trigger> {

  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  id!: number;

  @AllowNull(false)
  @Column
  name!: string;

  @Column
  description!: string;

  @AllowNull(false)
  @Column
  type!: string;

  @AllowNull(false)
  @Column(DataType.JSON)
  rules: any;

  @HasMany(() => Scene)
  scene!: Scene[];

}
