import { NotFound } from "../interfaces/Errors";
import { Paginate } from "../interfaces/RequestCommon";
import { PriceListDetailInterface } from "../interfaces/RequestPriceListDetail";
import { PriceListDetail } from "../models/priceListDetail.model";

export default class {
  async byId(id: number): Promise<PriceListDetail | null> {
    const priceListDetail = await PriceListDetail.findOne({ where: { id } })
    return priceListDetail
  }

  async create(obj: PriceListDetailInterface): Promise<PriceListDetail> {
    const priceListDetail = PriceListDetail.create({ ...obj })
    return priceListDetail
  }

  async paginated(limit: number = 20, offset: number = 0)
    : Promise<{
      priceListDetails: PriceListDetail[],
      paginate: Paginate
    }> {
    const priceListDetails = await PriceListDetail.findAll(
      { order: [['id', 'DESC']], limit, offset }
    )
    const paginate = {
      total: await PriceListDetail.count(),
      limit,
      offset
    }
    return { priceListDetails, paginate }
  }

  async update(id: number, obj: PriceListDetailInterface): Promise<void> {
    await PriceListDetail.update({ ...obj }, { where: { id } })
  }

  async delete(id: number): Promise<void> {
    await PriceListDetail.destroy({ where: { id } })
  }
}
