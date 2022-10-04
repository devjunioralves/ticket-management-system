import { BoughtTicketModel } from '@domain/models/bought-ticket'
import { BuyTicketModel } from '@domain/usecases/buy-ticket'

export interface BuyTicketRepository {
  buy: (buyTicket: BuyTicketModel) => Promise<BoughtTicketModel>
}
