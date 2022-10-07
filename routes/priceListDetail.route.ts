import { Request, Response, Router } from 'express'

import PriceListDetailService from '../services/priceListDetail.service'
import { BodyCreate, BodyUpdate, ParamId } from '../interfaces/RequestPriceListDetail'
import { QueryPaginate } from '../interfaces/RequestCommon'
import { NotFound } from '../interfaces/Errors'
// import { NotFound } from '../interfaces/Errors'

const router: Router = Router()

router.get('/', async (req: Request<QueryPaginate>, res: Response) => {
  const { query } = req
  const page = parseInt(`${query.page ?? 1}`)
  const limit = parseInt(`${query.limit ?? 20}`)
  const offset = (page - 1) * limit
  const priceListDetailService = new PriceListDetailService()
  const data = await priceListDetailService.paginated(limit, offset)
  res.status(200).json({ ...data })
})

router.post('/', async (req: Request<BodyCreate>, res: Response) => {
  const priceListDetailService = new PriceListDetailService()
  const data = req.body
  try {
    const priceListDetail = await priceListDetailService.create({ ...data })
    res.status(201).json({ ...priceListDetail.toJSON() })
  } catch (err: any) {
    res.status(422).json(err.message)
  }
})

router.get('/:priceListDetailId', async (req: Request<ParamId>, res: Response) => {
  const priceListDetailService = new PriceListDetailService()
  const { priceListDetailId } = req.params
  try {
    const priceListDetail = await priceListDetailService.byId(priceListDetailId)
    if (!priceListDetail) {
      throw new NotFound('Price list detail')
    }
    res.status(200).json({ ...priceListDetail.toJSON() })
  } catch (err: any) {
    res.status(404).json(err)
  }
})

router.put('/:priceListDetailId', async (req: Request<ParamId, BodyUpdate>, res: Response) => {
  const priceListDetailService = new PriceListDetailService()
  try {
    const data = req.body
    const { priceListDetailId } = req.params
    await priceListDetailService.update(priceListDetailId, data)
    res.status(204).json()
  } catch (err: any) {
    res.status(400).json(err)
  }
})

router.delete('/:priceListDetailId', async (req: Request<ParamId>, res: Response) => {
  const priceListDetailService = new PriceListDetailService()
  try {
    const { priceListDetailId } = req.params
    await priceListDetailService.delete(priceListDetailId)
    res.status(204).json()
  } catch (err) {
    res.status(400).json()
  }
})

export default router
