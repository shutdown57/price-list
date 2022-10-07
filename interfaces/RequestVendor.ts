import { Request } from 'express'

export interface ParamId {
  vendorId: number
}

export interface BodyCreate extends Request {
  name: string
  countries: Array<string>
}

export interface BodyUpdate extends Request {
  name: string
  countries: Array<string>
}
