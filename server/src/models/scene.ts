import { Table, Column, Model, PrimaryKey, DataType, BelongsTo, ForeignKey, HasMany, IsUUID, AllowNull, NotEmpty, Unique, DefaultScope } from 'sequelize-typescript';
import Trigger from './trigger';
import Action from './action';


@DefaultScope({
  include: [() => Trigger, () => Action]
})
@Table({
  tableName: 'scene',
  underscored: false
})
export default class Scene extends Model<Scene> {

  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Unique
  @Column({ type: DataType.UUIDV4 })
  id!: number;

  @AllowNull(false)
  @Unique
  @NotEmpty
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  description!: string;

  @ForeignKey(() => Trigger)
  @Column(DataType.UUIDV4)
  triggerId!: string;

  @BelongsTo(() => Trigger)
  trigger!: Trigger[];

  @HasMany(() => Action)
  actions!: Action[];

}
