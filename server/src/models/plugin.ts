import { Table, Column, Model, PrimaryKey, BelongsTo, ForeignKey, DataType, HasMany, HasOne, IsUUID, AllowNull } from 'sequelize-typescript';
import Satellite from './satellite';
import Variable from './variable';
import State from './state';

@Table({
  tableName: 'plugin',
  underscored: true
})
export default class Plugin extends Model<Plugin> {

  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  id!: number;

  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  version!: string;

  @AllowNull(false)
  @ForeignKey(() => Satellite)
  @Column(DataType.INTEGER)
  satellite_id!: number;

  @BelongsTo(() => Satellite)
  satellite!: Satellite;

  @HasMany(() => Variable)
  variables!: Variable[];

  @HasOne(() => State)
  state!: State;
}
