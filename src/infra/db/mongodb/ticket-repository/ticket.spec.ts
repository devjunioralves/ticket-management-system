import { MongoHelper } from '@infra/db/mongodb/helpers/mongo-helper'
import { TicketMongoRepository } from '@infra/db/mongodb/ticket-repository/ticket'

describe('Ticket mongo repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const boughtTicketCollection = MongoHelper.getCollection('tickets')
    await boughtTicketCollection.deleteMany({})
  })

  const makeSut = (): TicketMongoRepository => {
    return new TicketMongoRepository()
  }

  it('should add a ticket and return on success', async () => {
    const sut = makeSut()
    const ticket = await sut.add({
      title: 'any_title',
      description: 'any_description',
      price: 55.0,
      category: 'any_category',
      institution: 'any_institution',
    })
    expect(ticket).toBeTruthy()
    expect(ticket.id).toBeTruthy()
    expect(ticket.title).toBe('any_title')
    expect(ticket.description).toBe('any_description')
    expect(ticket.price).toBe(55)
    expect(ticket.category).toBe('any_category')
    expect(ticket.institution).toBe('any_institution')
  })
})
