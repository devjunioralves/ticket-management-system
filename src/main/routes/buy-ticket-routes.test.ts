import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('BuyTicket Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const boughtTicketsCollection = MongoHelper.getCollection('bought-tickets')
    await boughtTicketsCollection.deleteMany({})
  })

  it('should return an ticket on buy success', async () => {
    await request(app)
      .post('/api/ticket/buy')
      .send({
        ticketId: '63361f83646622dcd51ed451',
        customerId: '63361f8ad6e40b547c7dd545',
        customerName: 'Junior Alves',
        customerEmail: 'jrwanderley17@gmail.com',
        customerMobile: '47999999999',
        customerDocument: '22014435057',
        paymentType: 'credit_card',
        total: 55.0,
      })
      .expect(200)
  })
})
