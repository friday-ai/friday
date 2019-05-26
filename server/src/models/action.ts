import { Table, Column, Model, PrimaryKey, DataType, BelongsTo, ForeignKey, IsUUID, AllowNull } from 'sequelize-typescript';
import Scene from './scene';

@Table({
  tableName: 'action',
  underscored: true
})
export default class Action extends Model<Action> {

  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Column({type: DataType.INTEGER})
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  description: string;

  @AllowNull(false)
  @Column
  type: string;

  @AllowNull(false)
  @Column
  sub_type: string;

  @Column
  variable_key: string;

  @Column
  variable_value: string;

  @ForeignKey(() => Scene)
  @Column(DataType.INTEGER)
  scene_id: number;

  @BelongsTo(() => Scene)
  scene: Scene;

}
