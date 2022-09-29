import { BuyTicketRepository } from '../../../../data/protocols/buy-ticket-repository'
import { BoughtTicketModel } from '../../../../domain/models/bought-ticket'
import { BuyTicketModel } from '../../../../domain/usecases/buy-ticket'
import { MongoHelper } from '../helpers/mongo-helper'

export class BuyTicketMongoRepository implements BuyTicketRepository {
  async buy(buyTicketModel: BuyTicketModel): Promise<BoughtTicketModel> {
    const buyTicketCollection = MongoHelper.getCollection('bought-tickets')
    const transaction = await buyTicketCollection.insertOne(buyTicketModel)
    return MongoHelper.map(transaction)
  }
}
