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
import { Vendor } from './vendor.model'


interface PriceListAttributes {
  id: number
  vendor_id: number
  vendor?: Vendor
  date: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
}

interface PriceListCreationAttributes extends Optional<PriceListAttributes, 'id' | 'vendor'> { }

@DefaultScope(() => ({
  include: [Vendor]
}))
@Table({
  timestamps: true,
  tableName: 'price_lists',
  paranoid: true
})
export class PriceList extends Model<PriceListAttributes, PriceListCreationAttributes> {
  @ForeignKey(() => Vendor)
  @Column(DataType.INTEGER)
  vendor_id!: number

  @BelongsTo(() => Vendor)
  vendor!: Vendor

  @Column(DataType.DATE)
  date!: string

  @CreatedAt
  created_at?: string

  @UpdatedAt
  updated_at?: string

  @DeletedAt
  deleted_at?: string
}
