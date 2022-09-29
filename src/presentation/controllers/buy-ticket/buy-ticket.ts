import { BuyTicket } from '../../../domain/usecases/buy-ticket'
import { MissingParamError } from '../../errors/missing-param-error'
import { ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest } from '../../protocols/http'

export class BuyTicketController implements Controller {
  private readonly buyTicket: BuyTicket

  constructor(buyTicket: BuyTicket) {
    this.buyTicket = buyTicket
  }
  async handle(httpRequest: HttpRequest): Promise<any> {
    try {
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

      const buyTicket = await this.buyTicket.buy({ ...httpRequest.body })
      return ok(buyTicket)
    } catch (error) {
      return serverError(error)
    }
  }
}
