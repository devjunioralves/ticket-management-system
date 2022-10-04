import { ListTicket } from '@domain/usecases/list-ticket'
import { ok, serverError } from '@presentation/helpers/http-helper'
import { Controller } from '@presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@presentation/protocols/http'

export class ListTicketController implements Controller {
  private readonly listTicket: ListTicket

  constructor(listTicket: ListTicket) {
    this.listTicket = listTicket
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { title, institution } = httpRequest.query
      const filters = {
        title,
        institution,
      }
      const tickets = await this.listTicket.list(filters)
      return ok(tickets)
    } catch (error) {
      return serverError(error)
    }
  }
}
