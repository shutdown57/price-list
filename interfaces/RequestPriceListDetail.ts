export interface PriceListDetailInterface {
  price_list_id: number
  vendor_id: number
  product_id: string
  quantity: number
  price: number
  currency: string
  date: string
}

export interface BodyCreate {
  price_list_id: number
  vendor_id: number
  product_id: string
  quantity: number
  price: number
  currency: string
  date: string
}

export interface ParamId {
  priceListDetailId: number
}

export interface BodyUpdate {
  price_list_id: number
  vendor_id: number
  product_id: string
  quantity: number
  price: number
  currency: string
  date: string
}
