import { Controller } from '@presentation/protocols/controller'
import { BuyTicketMongoRepository } from '@infra/db/mongodb/buy-ticket-repository/buy-ticket'
import { DbBuyTicket } from '@data/usecases/buy-ticket/db-buy-ticket'
import { BuyTicketController } from '@presentation/controllers/buy-ticket/buy-ticket'

export const makeBuyTicketController = (): Controller => {
  const buyTicketMongoRepository = new BuyTicketMongoRepository()
  const dbBuyTicket = new DbBuyTicket(buyTicketMongoRepository)
  return new BuyTicketController(dbBuyTicket)
}
