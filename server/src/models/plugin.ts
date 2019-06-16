import { Table, Column, Model, PrimaryKey, BelongsTo, ForeignKey, DataType, HasOne, IsUUID, AllowNull, HasMany } from 'sequelize-typescript';
import Satellite from './satellite';
import State from './state';
import Variable from './variable';

@Table({
  tableName: 'plugin',
  underscored: false
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
  satelliteId!: number;

  @BelongsTo(() => Satellite)
  satellite!: Satellite;

  @HasMany(() => Variable, {
    foreignKey: 'owner',
    constraints: false
  })
  variables?: Variable[];

  @HasOne(() => State, {
    foreignKey: 'owner',
    constraints: false
  })
  state?: State;
}
