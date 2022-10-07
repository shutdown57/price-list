import { Optional } from 'sequelize'
import {
  Table,
  Column,
  Model,
  DataType,
  UpdatedAt,
  CreatedAt,
  ForeignKey,
  BelongsTo,
  DefaultScope,
  HasMany
} from 'sequelize-typescript'
import { Category } from './category.model'
import { PriceListDetail } from './priceListDetail.model'


interface ProductAttributes {
  id: string
  name: string
  pn: string
  price_min?: number
  price_max?: number
  description?: string
  unit?: string
  persian?: string
  category_id: string
  category?: Category
  priceListDetails: PriceListDetail[]
  created_at?: string
  updated_at?: string
}

interface ProductCreationAttributes extends Optional<
  ProductAttributes,
  'id' | 'category' | 'priceListDetails'
> { }

@DefaultScope(() => ({
  include: [Category]
}))
@Table({
  timestamps: true,
  tableName: 'products',
  paranoid: false
})
export class Product extends Model<ProductAttributes, ProductCreationAttributes> {
  @Column({ type: DataType.CHAR(36), primaryKey: true, autoIncrement: false })
  id?: string

  @ForeignKey(() => Category)
  @Column(DataType.STRING)
  category_id!: string

  @BelongsTo(() => Category)
  category?: Category

  @HasMany(() => PriceListDetail)
  priceListDetails?: PriceListDetail[]

  @Column(DataType.STRING)
  name!: string

  @Column(DataType.STRING)
  pn?: string

  @Column(DataType.STRING)
  persian?: string

  @Column(DataType.INTEGER)
  price_min?: number

  @Column(DataType.INTEGER)
  price_max?: number

  @Column(DataType.TEXT)
  description?: string

  @Column(DataType.STRING)
  unit?: string

  @CreatedAt
  created_at?: string

  @UpdatedAt
  updated_at?: string
}
