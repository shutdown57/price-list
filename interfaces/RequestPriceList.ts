import { Request } from 'express'

export interface ParamId {
  priceListId: number
}

export interface BodyCreate extends Request {
  vendorId: number
  date: string
}

export interface BodyUpdate extends Request {
  vendorId: number
  date: string
}
