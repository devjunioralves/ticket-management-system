import { BoughtTicketModel } from '../models/bought-ticket'

export interface BuyTicketModel {
  ticketId: string
  customerId: string
  customerName: string
  customerEmail: string
  customerMobile: string
  customerDocument: string
  paymentType: string
  total: number
}

export interface BuyTicket {
  buy(buyTicket: BuyTicketModel): Promise<BoughtTicketModel>
}
