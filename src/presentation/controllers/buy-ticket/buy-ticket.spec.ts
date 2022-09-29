import { MissingParamError } from '../../errors/missing-param-error'
import { Controller } from '../../protocols/controller'
import { BuyTicketController } from './buy-ticket'

const makeSut = (): Controller => {
  const sut = new BuyTicketController()

  return sut
}

describe('BuyTicket Controller', () => {
  it('should return 400 if not customer name is provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        ticketId: 'any_ticket_id',
        customerId: 'any_customer_id',
        customerEmail: 'any_user_email',
        customerMobile: 'any_user_mobile',
        customerDocument: 'any_user_document',
        paymentType: 'any_payment_form',
        total: 55.0,
      },
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('customerName'))
  })
})
