import { Table, Column, Model, PrimaryKey, DataType, BelongsTo, ForeignKey, IsUUID, AllowNull, Unique, NotEmpty, DefaultScope } from 'sequelize-typescript';
import Scene from './scene';


@DefaultScope({
  include: [() => Scene]
})
@Table({
  tableName: 'action',
  underscored: false
})
export default class Action extends Model<Action> {

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
  @Column
  subType!: string;

  @Column
  variableKey!: string;

  @Column
  variableValue!: string;

  @ForeignKey(() => Scene)
  @Column(DataType.INTEGER)
  sceneId!: number;

  @BelongsTo(() => Scene)
  scene!: Scene;

}
