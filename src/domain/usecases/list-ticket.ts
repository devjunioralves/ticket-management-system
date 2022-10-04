import { TicketModel } from '@domain/models/ticket'

export interface ListTicketFilter {
  title?: string
  institution?: string
}

export interface ListTicket {
  list: (filters?: ListTicketFilter) => Promise<TicketModel[]>
}
