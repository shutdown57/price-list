import { PriceList } from '../models/priceList.model'
import { Paginate } from '../interfaces/RequestCommon'


export default class {
  async create(vendorId: number, date: string): Promise<PriceList> {
    const priceList = await PriceList.create({
      vendor_id: vendorId,
      date
    })

    return priceList
  }

  async update(id: number, date: string, vendorId: number): Promise<void> {
    await PriceList.update(
      { date, vendor_id: vendorId },
      { where: { id } }
    )
  }

  async byId(id: number): Promise<PriceList | null> {
    const priceList = await PriceList.findOne({ where: { id } })
    return priceList
  }

  async delete(id: number): Promise<void> {
    await PriceList.destroy({ where: { id } })
  }

  async paginated(limit: number = 20, offset: number = 0): Promise<{ priceLists: PriceList[], paginate: Paginate }> {
    const priceLists = await PriceList.findAll(
      { order: [['id', 'DESC']], limit, offset }
    )
    const paginate = {
      total: await PriceList.count(),
      limit,
      offset
    }
    return { priceLists, paginate }
  }
}
