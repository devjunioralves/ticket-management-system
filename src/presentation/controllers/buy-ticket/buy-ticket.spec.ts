import { BoughtTicketModel } from '../../../domain/models/bought-ticket'
import { BuyTicket, BuyTicketModel } from '../../../domain/usecases/buy-ticket'
import { MissingParamError } from '../../errors/missing-param-error'
import { BuyTicketController } from './buy-ticket'

const makeBuyTicket = (): BuyTicket => {
  class BuyTicketStub implements BuyTicket {
    async buy(buyTicket: BuyTicketModel): Promise<BoughtTicketModel> {
      return await new Promise((resolve) =>
        resolve({
          id: 'any_id',
          ticketId: 'any_ticket_id',
          customerId: 'any_customer_id',
          customerName: 'any_customer_name',
          customerEmail: 'any_user_email',
          customerMobile: 'any_user_mobile',
          customerDocument: 'any_user_document',
          paymentType: 'any_payment_form',
          total: 55.0,
        }),
      )
    }
  }
  return new BuyTicketStub()
}

interface SutTypes {
  sut: BuyTicketController
  buyTicketStub: BuyTicket
}

const makeSut = (): SutTypes => {
  const buyTicketStub = makeBuyTicket()
  const sut = new BuyTicketController(buyTicketStub)

  return {
    sut,
    buyTicketStub,
  }
}

describe('BuyTicket Controller', () => {
  it('should return 400 if not customer name is provided', async () => {
    const { sut } = makeSut()
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

  it('should call buyTicket with correct values', async () => {
    const { sut, buyTicketStub } = makeSut()
    const buySpy = jest.spyOn(buyTicketStub, 'buy')

    const httpRequest = {
      body: {
        ticketId: 'any_ticket_id',
        customerName: 'any_customer_name',
        customerId: 'any_customer_id',
        customerEmail: 'any_user_email',
        customerMobile: 'any_user_mobile',
        customerDocument: 'any_user_document',
        paymentType: 'any_payment_form',
        total: 55.0,
      },
    }

    await sut.handle(httpRequest)
    expect(buySpy).toHaveBeenCalledWith({
      ticketId: 'any_ticket_id',
      customerName: 'any_customer_name',
      customerId: 'any_customer_id',
      customerEmail: 'any_user_email',
      customerMobile: 'any_user_mobile',
      customerDocument: 'any_user_document',
      paymentType: 'any_payment_form',
      total: 55.0,
    })
  })
})
