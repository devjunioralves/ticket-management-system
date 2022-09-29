import { DbBuyTicket } from './db-buy-ticket'

const makeBuyTicketsRepository = (): any => {
  class BuyTicketRepositoryStub {
    async buy(buyTicketRequest: any): Promise<any> {
      return new Promise((resolve) =>
        resolve({
          id: 'valid_id',
          ticketId: 'valid_ticket_id',
          customerName: 'valid_customer_name',
          customerId: 'valid_customer_id',
          customerEmail: 'valid_customer_email',
          customerMobile: 'valid_customer_mobile',
          customerDocument: 'valid_customer_document',
          paymentType: 'valid_payment_type',
          total: 55.0,
        }),
      )
    }
  }
  return new BuyTicketRepositoryStub()
}

const makeSut = (): any => {
  const buyTicketRepositoryStub = makeBuyTicketsRepository()
  const sut = new DbBuyTicket(buyTicketRepositoryStub)
  return {
    sut,
    buyTicketRepositoryStub,
  }
}

describe('DbBuyTicket useCase', () => {
  it('should call BuyTicketRepository with correct values', async () => {
    const { sut, buyTicketRepositoryStub } = makeSut()
    const buySpy = jest.spyOn(buyTicketRepositoryStub, 'buy')
    const buyTicketRequest = {
      ticketId: 'valid_ticket_id',
      customerName: 'valid_customer_name',
      customerId: 'valid_customer_id',
      customerEmail: 'valid_customer_email',
      customerMobile: 'valid_customer_mobile',
      customerDocument: 'valid_customer_document',
      paymentType: 'valid_payment_type',
      total: 55.0,
    }
    await sut.buy(buyTicketRequest)
    expect(buySpy).toHaveBeenCalledWith({
      ticketId: 'valid_ticket_id',
      customerName: 'valid_customer_name',
      customerId: 'valid_customer_id',
      customerEmail: 'valid_customer_email',
      customerMobile: 'valid_customer_mobile',
      customerDocument: 'valid_customer_document',
      paymentType: 'valid_payment_type',
      total: 55.0,
    })
  })
  it('should return the purchase details when success', async () => {
    const { sut } = makeSut()
    const buyTicketRequest = {
      ticketId: 'valid_ticket_id',
      customerName: 'valid_customer_name',
      customerId: 'valid_customer_id',
      customerEmail: 'valid_customer_email',
      customerMobile: 'valid_customer_mobile',
      customerDocument: 'valid_customer_document',
      paymentType: 'valid_payment_type',
      total: 55.0,
    }
    const boughtTicket = await sut.buy(buyTicketRequest)
    expect(boughtTicket).toEqual({
      id: 'valid_id',
      ticketId: 'valid_ticket_id',
      customerName: 'valid_customer_name',
      customerId: 'valid_customer_id',
      customerEmail: 'valid_customer_email',
      customerMobile: 'valid_customer_mobile',
      customerDocument: 'valid_customer_document',
      paymentType: 'valid_payment_type',
      total: 55.0,
    })
  })
})