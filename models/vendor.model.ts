import { Optional } from 'sequelize'
import {
  Table,
  Column,
  Model,
  DataType,
  DeletedAt,
  UpdatedAt,
  CreatedAt
} from 'sequelize-typescript'


interface VendorAttributes {
  id: string
  name: string
  countries: Array<string>
  created_at?: string
  updated_at?: string
  deleted_at?: string
}

interface VendorCreationAttributes extends Optional<VendorAttributes, 'id'> { }

@Table({
  timestamps: true,
  tableName: 'vendors'
})
export class Vendor extends Model<VendorAttributes, VendorCreationAttributes> {
  @Column(DataType.STRING)
  name!: string

  @Column(DataType.JSON)
  countries?: Array<string>

  @CreatedAt
  created_at?: string

  @UpdatedAt
  updated_at?: string

  @DeletedAt
  deleted_at?: string
}
