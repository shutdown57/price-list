import { Optional } from 'sequelize'
import { Table, Column, Model, DataType, BelongsTo } from 'sequelize-typescript'
import { User } from './user.model'


interface RuleAttributes {
  id: number
  ptype: string
  v0: string
  v1: string
  v2: string
}

interface RuleCreationAttributes extends Optional<RuleAttributes, 'id'> { }

@Table({
  timestamps: false,
  tableName: 'rules'
})
export class Rule extends Model<RuleAttributes, RuleCreationAttributes> {
  @Column(DataType.STRING)
  ptype!: string

  @Column(DataType.STRING)
  v0!: string

  @Column(DataType.STRING)
  v1!: string

  @Column(DataType.STRING)
  v2?: string

  @BelongsTo(() => User, 'v0')
  user?: User
}
