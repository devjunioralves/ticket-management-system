import { BuyTicketRepository } from '../../../../data/protocols/buy-ticket-repository'
import { BoughtTicketModel } from '../../../../domain/models/bought-ticket'
import { BuyTicketModel } from '../../../../domain/usecases/buy-ticket'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class BuyTicketMongoRepository implements BuyTicketRepository {
  async buy(buyTicketModel: BuyTicketModel): Promise<BoughtTicketModel> {
    const buyTicketCollection = MongoHelper.getCollection('bought-tickets')
    const { insertedId } = await buyTicketCollection.insertOne({
      ...buyTicketModel,
      ticketId: new ObjectId(buyTicketModel.ticketId),
      customerId: new ObjectId(buyTicketModel.customerId),
    })
    const transaction = await buyTicketCollection.findOne<Promise<BoughtTicketModel | any>>({ _id: insertedId })
    return MongoHelper.map(transaction)
  }
}
