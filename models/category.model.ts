import { Optional } from 'sequelize'
import {
  Table,
  Column,
  Model,
  DataType,
  UpdatedAt,
  CreatedAt,
  HasMany
} from 'sequelize-typescript'
import { Product } from './product.model'


interface CategoryAttributes {
  id: string
  name: string
  products?: Product[]
  description: string
  created_at: string
  updated_at: string
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id' | 'products'> { }

@Table({
  timestamps: true,
  tableName: 'categories',
  paranoid: false
})
export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> {
  @Column({ type: DataType.STRING, primaryKey: true, autoIncrement: false })
  id?: string

  @Column(DataType.STRING)
  name!: string

  @Column(DataType.TEXT)
  description?: string

  @HasMany(() => Product)
  products?: Product[]

  @CreatedAt
  created_at?: string

  @UpdatedAt
  updated_at?: string
}
