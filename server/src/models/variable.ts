import { Table, Column, Model, PrimaryKey, DataType, IsUUID, AllowNull, Unique, NotEmpty, BelongsTo } from 'sequelize-typescript';
import { VariableOwner } from '../utils/constants';
import User from './user';
import Plugin from './plugin';
import Satellite from './satellite';

@Table({
  tableName: 'variable',
  underscored: false
})
export default class Variable extends Model<Variable> {

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
  key!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  value!: string;

  @AllowNull(false)
  @Column(DataType.UUIDV4)
  owner!: string;

  @AllowNull(false)
  @Column
  ownerType!: VariableOwner;

  @BelongsTo(() => User, {
    foreignKey: 'owner',
    constraints: false
  })
  user?: User;

  @BelongsTo(() => Plugin, {
    foreignKey: 'owner',
    constraints: false
  })
  plugin?: Plugin;

  @BelongsTo(() => Satellite, {
    foreignKey: 'owner',
    constraints: false
  })
  satellite?: Satellite;

}
