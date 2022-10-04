import { TicketModel } from '@domain/models/ticket'

export interface AddTicketModel {
  title: string
  description: string
  price: number
  category: string
  institution: string
}

export interface AddTicket {
  add: (ticket: AddTicketModel) => Promise<TicketModel>
}
