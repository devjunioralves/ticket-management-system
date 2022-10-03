import { MongoHelper } from '../helpers/mongo-helper'
import { BuyTicketMongoRepository } from './buy-ticket'
import { ObjectId } from 'mongodb'

describe('BuyTicket mongo repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const boughtTicketCollection = MongoHelper.getCollection('bought-tickets')
    await boughtTicketCollection.deleteMany({})
  })

  const makeSut = (): BuyTicketMongoRepository => {
    return new BuyTicketMongoRepository()
  }

  it('should return an bought ticket on success', async () => {
    const sut = makeSut()
    const ticket = await sut.buy({
      ticketId: '63361f83646622dcd51ed451',
      customerName: 'any_customer_name',
      customerId: '63361f8ad6e40b547c7dd545',
      customerEmail: 'any_user_email',
      customerMobile: 'any_user_mobile',
      customerDocument: 'any_user_document',
      paymentType: 'any_payment_form',
      total: 55.0,
    })
    expect(ticket).toBeTruthy()
    expect(ticket.id).toBeTruthy()
    expect(ticket.customerName).toBe('any_customer_name')
    expect(ticket.customerId).toStrictEqual(new ObjectId('63361f8ad6e40b547c7dd545'))
    expect(ticket.customerEmail).toBe('any_user_email')
    expect(ticket.customerDocument).toBe('any_user_document')
    expect(ticket.paymentType).toBe('any_payment_form')
    expect(ticket.total).toBe(55)
    expect(ticket.ticketId).toStrictEqual(new ObjectId('63361f83646622dcd51ed451'))
  })
})
