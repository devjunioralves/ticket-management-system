import { TicketModel } from '../../../domain/models/ticket'
import { ListTicket, ListTicketFilter } from '../../../domain/usecases/list-ticket'
import { ListTicketRepository } from '../../protocols/list-ticket-repository'

export class DbListTicket implements ListTicket {
  private readonly ticketRepository: ListTicketRepository
  constructor(listTicketRepository: ListTicketRepository) {
    this.ticketRepository = listTicketRepository
  }
  async list(ticket?: ListTicketFilter): Promise<TicketModel[]> {
    return await this.ticketRepository.list(ticket)
  }
}
