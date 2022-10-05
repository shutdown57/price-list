import { User } from '../models/user.model'
import { Rule } from '../models/rule.model'


export default class {
  async byId(id: string): Promise<User | null> {
    const user = await User.findOne({
      where: { id },
      include: Rule
    })

    return user
  }
}
