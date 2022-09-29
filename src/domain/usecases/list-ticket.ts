import { TicketModel } from '../models/ticket'

export interface ListTicketFilter {
  title?: string
  institution?: string
}

export interface ListTicket {
  list: (filters: ListTicketFilter) => Promise<TicketModel[]>
}
