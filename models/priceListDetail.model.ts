import { Optional } from 'sequelize'
import {
  Table,
  Column,
  Model,
  DataType,
  DeletedAt,
  UpdatedAt,
  CreatedAt,
  ForeignKey,
  BelongsTo,
  DefaultScope
} from 'sequelize-typescript'
import { PriceList } from './priceList.model'
import { Product } from './product.model'
import { Vendor } from './vendor.model'


interface PriceListDetailAttributes {
  id: number
  price_list_id: number
  priceList?: PriceList
  vendor_id: number
  vendor?: Vendor
  product_id: string
  product?: Product
  quantity: number
  price: number
  currency: string
  date: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
}

interface PriceListDetailCreationAttributes extends Optional<
  PriceListDetailAttributes,
  'id' | 'vendor' | 'priceList' | 'product'
> { }

@DefaultScope(() => ({
  include: [Vendor, Product, PriceList]
}))
@Table({
  timestamps: true,
  tableName: 'price_list_details',
  paranoid: true,
  collate: 'utf8mb4_unicode_ci'
})
export class PriceListDetail extends Model<PriceListDetailAttributes, PriceListDetailCreationAttributes> {
  @ForeignKey(() => Vendor)
  @Column(DataType.BIGINT)
  vendor_id!: number

  @BelongsTo(() => Vendor)
  vendor!: Vendor

  @ForeignKey(() => Product)
  @Column(DataType.CHAR(36))
  product_id!: string

  @BelongsTo(() => Product)
  product!: Product

  @ForeignKey(() => PriceList)
  @Column(DataType.INTEGER)
  price_list_id!: number

  @BelongsTo(() => PriceList)
  priceList!: PriceList

  @Column(DataType.INTEGER)
  quantity!: number

  @Column(DataType.STRING)
  currency!: number

  @Column(DataType.INTEGER)
  price!: number

  @Column(DataType.DATE)
  date!: string

  @CreatedAt
  created_at?: string

  @UpdatedAt
  updated_at?: string

  @DeletedAt
  deleted_at?: string
}
