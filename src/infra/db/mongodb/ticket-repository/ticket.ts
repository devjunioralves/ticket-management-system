import { AddTicketRepository } from '../../../../data/protocols/add-ticket-repository'
import { TicketModel } from '../../../../domain/models/ticket'
import { AddTicketModel } from '../../../../domain/usecases/add-ticket'
import { MongoHelper } from '../helpers/mongo-helper'

export class TicketMongoRepository implements AddTicketRepository {
  async add(ticketData: AddTicketModel): Promise<TicketModel> {
    const ticketCollection = MongoHelper.getCollection('tickets')
    const { insertedId } = await ticketCollection.insertOne(ticketData)
    const ticket = await ticketCollection.findOne<Promise<TicketModel | any>>({ _id: insertedId })
    return MongoHelper.map(ticket)
  }
}
