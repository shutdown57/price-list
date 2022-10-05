import { Optional } from 'sequelize'
import { Table, Column, Model, DataType, HasMany, DefaultScope } from 'sequelize-typescript'
import { Rule } from './rule.model'


interface UserAttributes {
  id: string
  name: string
  email: string
  mobile: string
  created_at: string
  updated_at: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

@DefaultScope(() => ({
  include: [Rule]
}))
@Table({
  timestamps: false,
  tableName: 'users'
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column(DataType.STRING)
  name!: string

  @Column(DataType.STRING)
  email!: string

  @Column(DataType.STRING)
  mobile!: string

  @HasMany(() => Rule, 'v0')
  rules?: Rule[]

  @Column(DataType.DATE)
  created_at?: string

  @Column(DataType.DATE)
  updated_at?: string
}
