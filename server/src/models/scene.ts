import { Table, Column, Model, PrimaryKey, DataType, BelongsTo, ForeignKey, HasMany, IsUUID, AllowNull } from 'sequelize-typescript';
import Trigger from './trigger';
import Action from './action';

@Table({
  tableName: 'scene',
  underscored: true
})
export default class Scene extends Model<Scene> {

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

  @ForeignKey(() => Trigger)
  @Column(DataType.INTEGER)
  trigger_id!: number;

  @BelongsTo(() => Trigger)
  trigger!: Trigger[];

  @HasMany(() => Action)
  actions!: Action[];

}
