import { Request, Response, Router } from 'express'

import PriceListService from '../services/priceList.service'
import { BodyCreate, BodyUpdate, ParamId } from '../interfaces/RequestPriceList'
import { QueryPaginate } from '../interfaces/RequestCommon'


const router: Router = Router()

router.get('/', async (req: Request<unknown, unknown, unknown, QueryPaginate>, resp: Response) => {
  const { query } = req
  const priceListService = new PriceListService()
  const page = query.page ?? 1
  const limit = query.limit ?? 20
  const offset = (page - 1) * limit
  const priceLists = await priceListService.paginated(limit, offset)

  resp.json({ ...priceLists })
})

router.post('/', async (req: Request<BodyCreate>, res: Response) => {
  const { date, vendorId } = req.body
  const priceListService = new PriceListService()
  const priceList = await priceListService.create(vendorId, date)
  res.status(201)
  res.json({ ...priceList.toJSON() })
})

router.get('/:priceListId', async (req: Request<ParamId>, res: Response) => {
  const priceListService = new PriceListService()
  const priceList = await priceListService.byId(req.params.priceListId)
  if (!priceList) {
    res.status(404)
  }
  res.json({ ...priceList?.toJSON() })
})

router.put('/:priceListId', async (req: Request<ParamId, BodyUpdate>, res: Response) => {
  const priceListService = new PriceListService()
  const { date, vendorId } = req.body
  await priceListService.update(req.params.priceListId, date, vendorId)
  res.status(204)
  res.json({})
})

router.delete('/:priceListId', async (req: Request<ParamId>, res: Response) => {
  const priceListService = new PriceListService()
  await priceListService.delete(req.params.priceListId)
  res.status(204)
  res.json({})
})

export default router
