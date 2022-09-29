import { TicketModel } from '../../domain/models/ticket'
import { ListTicketFilter } from '../../domain/usecases/list-ticket'

export interface ListTicketRepository {
  list: (ticket: ListTicketFilter) => Promise<TicketModel[]>
}
