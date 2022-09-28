import { TicketModel } from '../../../domain/models/ticket'
import { AddTicket, AddTicketModel } from '../../../domain/usecases/add-ticket'
import { AddTicketRepository } from '../../protocols/add-ticket-repository'

export class DbAddTicket implements AddTicket {
  private readonly addTicketRepository: AddTicketRepository
  constructor(addTicketRepository: AddTicketRepository) {
    this.addTicketRepository = addTicketRepository
  }
  async add(ticket: AddTicketModel): Promise<TicketModel> {
    return await this.addTicketRepository.add(ticket)
  }
}
