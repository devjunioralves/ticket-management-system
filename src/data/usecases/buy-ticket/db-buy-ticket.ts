import { BoughtTicketModel } from '@domain/models/bought-ticket'
import { BuyTicket, BuyTicketModel } from '@domain/usecases/buy-ticket'
import { BuyTicketRepository } from '@data/protocols/buy-ticket-repository'

export class DbBuyTicket implements BuyTicket {
  private readonly buyTicketRepository: BuyTicketRepository
  constructor(buyTicketRepository: BuyTicketRepository) {
    this.buyTicketRepository = buyTicketRepository
  }

  async buy(buyTicket: BuyTicketModel): Promise<BoughtTicketModel> {
    return await this.buyTicketRepository.buy(buyTicket)
  }
}
