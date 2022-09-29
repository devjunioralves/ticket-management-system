import { AddTicketRepository } from '../../../../data/protocols/add-ticket-repository'
import { ListTicketRepository } from '../../../../data/protocols/list-ticket-repository'
import { TicketModel } from '../../../../domain/models/ticket'
import { AddTicketModel } from '../../../../domain/usecases/add-ticket'
import { ListTicketFilter } from '../../../../domain/usecases/list-ticket'
import { MongoHelper } from '../helpers/mongo-helper'

export class TicketMongoRepository implements AddTicketRepository, ListTicketRepository {
  async add(ticketData: AddTicketModel): Promise<TicketModel> {
    const ticketCollection = MongoHelper.getCollection('tickets')
    const { insertedId } = await ticketCollection.insertOne(ticketData)
    const ticket = await ticketCollection.findOne<Promise<TicketModel | any>>({ _id: insertedId })
    return MongoHelper.map(ticket)
  }

  async list(ticket?: ListTicketFilter): Promise<TicketModel[]> {
    const ticketCollection = MongoHelper.getCollection('tickets')
    const tickets = await ticketCollection
      .find<Promise<TicketModel[] | any>>({
        title: ticket?.title ?? { $exists: true },
        institution: ticket?.institution ?? { $exists: true },
      })
      .toArray()
    return tickets.map((ticket) => MongoHelper.map(ticket))
  }
}
