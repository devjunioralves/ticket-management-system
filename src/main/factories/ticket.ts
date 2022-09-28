import { Controller } from '../../presentation/protocols/controller'
import { TicketMongoRepository } from '../../infra/db/mongodb/ticket-repository/ticket'
import { DbAddTicket } from '../../data/usecases/add-ticket/db-add-ticket'
import { CreateTicketController } from '../../presentation/controllers/ticket/create-ticket'

export const makeTicketController = (): Controller => {
  const ticketMongoRepository = new TicketMongoRepository()
  const dbAddTicket = new DbAddTicket(ticketMongoRepository)
  return new CreateTicketController(dbAddTicket)
}
