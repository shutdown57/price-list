import { Optional } from 'sequelize'
import {
  Table,
  Column,
  Model,
  DataType,
  DeletedAt,
  UpdatedAt,
  CreatedAt,
  HasMany
} from 'sequelize-typescript'
import { PriceList } from './priceList.model'


interface VendorAttributes {
  id: number
  name: string
  countries: Array<string>
  created_at?: string
  updated_at?: string
  deleted_at?: string
}

interface VendorCreationAttributes extends Optional<VendorAttributes, 'id'> { }

@Table({
  timestamps: true,
  tableName: 'vendors',
  paranoid: true
})
export class Vendor extends Model<VendorAttributes, VendorCreationAttributes> {
  @Column(DataType.STRING)
  name!: string

  @Column(DataType.JSON)
  countries?: Array<string>

  @HasMany(() => PriceList)
  pricelists?: PriceList[]

  @CreatedAt
  created_at?: string

  @UpdatedAt
  updated_at?: string

  @DeletedAt
  deleted_at?: string
}
