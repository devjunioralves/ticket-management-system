import { BoughtTicketModel } from '../../../domain/models/bought-ticket'
import { BuyTicketModel } from '../../../domain/usecases/buy-ticket'
import { BuyTicketRepository } from '../../protocols/buy-ticket-repository'
import { DbBuyTicket } from './db-buy-ticket'

const makeBuyTicketsRepository = (): BuyTicketRepository => {
  class BuyTicketRepositoryStub implements BuyTicketRepository {
    async buy(buyTicketRequest: BuyTicketModel): Promise<BoughtTicketModel> {
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

interface SutTypes {
  sut: DbBuyTicket
  buyTicketRepositoryStub: BuyTicketRepository
}

const makeSut = (): SutTypes => {
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
  it('should throw if BuyTicketRepository throws', async () => {
    const { sut, buyTicketRepositoryStub } = makeSut()
    jest
      .spyOn(buyTicketRepositoryStub, 'buy')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
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
    const promise = sut.buy(buyTicketRequest)
    await expect(promise).rejects.toThrow()
  })
})
