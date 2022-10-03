import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Ticket Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const ticketsCollection = MongoHelper.getCollection('tickets')
    await ticketsCollection.deleteMany({})
  })

  it('should return an ticket on success', async () => {
    await request(app)
      .post('/api/ticket')
      .send({
        title: 'any_title',
        description: 'any_description',
        price: 55.0,
        category: 'any_category',
        institution: 'any_institution',
      })
      .expect(200)
  })

  it('should return an tickets list', async () => {
    const createTicket = await request(app).post('/api/ticket').send({
      title: 'any_title',
      description: 'any_description',
      price: 55.0,
      category: 'any_category',
      institution: 'any_institution',
    })
    await request(app)
      .get('/api/ticket')
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(1)
      })
  })
})
