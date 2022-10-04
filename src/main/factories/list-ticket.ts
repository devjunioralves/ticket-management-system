import { Controller } from '@presentation/protocols/controller'
import { TicketMongoRepository } from '@infra/db/mongodb/ticket-repository/ticket'
import { DbListTicket } from '@data/usecases/list-ticket/db-list-ticket'
import { ListTicketController } from '@presentation/controllers/list-ticket/list-ticket'

export const makeListTicketController = (): Controller => {
  const ticketMongoRepository = new TicketMongoRepository()
  const dbAddTicket = new DbListTicket(ticketMongoRepository)
  return new ListTicketController(dbAddTicket)
}
