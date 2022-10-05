import { Rule } from '../models/rule.model'


export default class {
  async all(): Promise<Rule[] | []> {
    const rules = await Rule.findAll()

    return rules
  }
}
