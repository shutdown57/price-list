import { Response, Router } from 'express'


const router: Router = Router()

router.get('/', async (res: Response): Promise<any> => {
  res.json({ message: 'OK' })
})

export default router
