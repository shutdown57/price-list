import { Vendor } from '../models/vendor.model'


export default class {
  async create(name: string, countries: Array<string>): Promise<Vendor> {
    const vendor = await Vendor.create({
      name,
      countries
    })

    return vendor
  }

  async update(id: number, name: string, countries: Array<string>): Promise<void> {
    await Vendor.update(
      { name, countries },
      { where: { id } }
    )
  }

  async byId(id: number): Promise<Vendor | null> {
    const vendor = await Vendor.findOne({ where: { id } })
    return vendor
  }

  async delete(id: number): Promise<void> {
    await Vendor.destroy({ where: { id } })
  }

  async paginated(limit: number = 20, offset: number = 0): Promise<Vendor[]> {
    const vendors = await Vendor.findAll(
      { order: [['id', 'DESC']], limit, offset }
    )
    return vendors
  }
}
