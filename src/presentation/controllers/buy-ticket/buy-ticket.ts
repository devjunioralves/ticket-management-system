import { MissingParamError } from '../../errors/missing-param-error'
import { Controller } from '../../protocols/controller'
import { HttpRequest } from '../../protocols/http'

export class BuyTicketController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<any> {
    const requiredFields = [
      'ticketId',
      'customerId',
      'customerName',
      'customerEmail',
      'customerMobile',
      'customerDocument',
      'paymentType',
      'total',
    ]

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
          body: new MissingParamError(field),
        }
      }
    }
  }
}
