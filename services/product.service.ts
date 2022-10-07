import { Paginate } from '../interfaces/RequestCommon'
import { Product } from '../models/product.model'

export default class {
  async paginated(limit: number = 20, offset: number = 0): Promise<{ products: Product[], paginate: Paginate }> {
    const products = await Product.findAll(
      { order: [['id', 'DESC']], limit, offset }
    )

    const paginate = {
      total: await Product.count(),
      limit,
      offset
    }
    return { products, paginate }
  }

  async byId(id: string): Promise<Product | null> {
    const product = await Product.findOne({ where: { id } })

    return product
  }
}
