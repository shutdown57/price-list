// import { Rule } from '../models/rule.model'
import { Response, Router } from 'express'

// import RuleService from '../services/rule.service'
// import { User } from '../models/user.model'
// import VendorService from '../services/vendor.service'


const router: Router = Router()

router.get('/', async (_, res: Response): Promise<any> => {
  // const vendorService = new VendorService()
  // console.log(vendorService)
  // const ruleService = new RuleService()
  // const rules = await ruleService.all()
  // const users = await User.findAll({ include: Rule })
  // const user = await User.findOne({ where: { id: '27a297f3-8135-4784-b666-2311adabef52' } })
  res.json({ message: 'OK' })
})

export default router
