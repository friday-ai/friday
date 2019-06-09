import { Table, Column, Model, PrimaryKey, DataType, IsUUID, AllowNull, Unique, NotEmpty, DefaultScope } from 'sequelize-typescript';
import { Variable_owner } from '../utils/constants';

@DefaultScope({
  attributes: ['id', 'key', 'value', 'owner', 'owner_type']
})
@Table({
  tableName: 'variable',
  underscored: true
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
  owner_type!: Variable_owner;
}
