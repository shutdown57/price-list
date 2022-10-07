export class NotFound extends Error {
  public statusCode: number = 404
  constructor(message: string) {
    super(`${message} not found`)
  }
}

export class NotEnoughProperty extends Error {
  public statusCode: number = 422
  public message: string
  public name: string
  public stack?: string | undefined
  constructor(msg: string) {
    super(`${msg} not enough property`)
    this.message = `${msg} not enough property`
    this.name = 'NotEnoughProperty'
  }
}
