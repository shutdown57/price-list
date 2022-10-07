import { Request, Response, Router } from 'express'

import VendorService from '../services/vendor.service'
import { BodyCreate, BodyUpdate, ParamId } from '../interfaces/RequestVendor'
import { QueryPaginate } from '../interfaces/RequestCommon'


const router: Router = Router()

router.get('/', async (req: Request<unknown, unknown, unknown, QueryPaginate>, res: Response) => {
  const { query } = req
  const page = query.page ?? 1
  const limit = query.limit ?? 20
  const offset = (page - 1) * limit
  const vendorService = new VendorService()
  const data = await vendorService.paginated(limit, offset)
  res.json({ ...data })
})

router.post('/', async (req: Request<BodyCreate>, res: Response): Promise<any> => {
  const vendorService = new VendorService()
  const { name, countries } = req.body
  const vendor = await vendorService.create(name, countries)
  res.json({ ...vendor.toJSON() })
})

router.get('/:vendorId', async (req: Request<ParamId>, res: Response): Promise<any> => {
  const vendorService = new VendorService()
  const vendor = await vendorService.byId(req.params.vendorId)
  if (!vendor) {
    res.status(404)
  }
  res.json({ ...vendor?.toJSON() })
})

router.put('/:vendorId', async (req: Request<ParamId, BodyUpdate>, res: Response): Promise<any> => {
  const vendorService = new VendorService()
  const { vendorId } = req.params
  const { name, countries } = req.body
  await vendorService.update(vendorId, name, countries)
  res.status(204)
  res.json({})
})

router.delete('/:vendorId', async (req: Request<ParamId>, res: Response): Promise<any> => {
  const vendorService = new VendorService()
  const { vendorId } = req.params
  await vendorService.delete(vendorId)
  res.status(204)
  res.json({})
})

export default router
