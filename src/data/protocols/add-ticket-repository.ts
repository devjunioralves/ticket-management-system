import { AddTicketModel } from '../../domain/usecases/add-ticket'
import { TicketModel } from '../../domain/models/ticket'

export interface AddTicketRepository {
  add: (ticketData: AddTicketModel) => Promise<TicketModel>
}
