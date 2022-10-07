export interface Paginate {
  total: number
  limit: number
  offset: number
}

export interface QueryPaginate {
  limit?: number
  page?: number
}
