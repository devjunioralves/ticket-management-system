import { AddTicket } from '@domain/usecases/add-ticket'
import { MissingParamError } from '@presentation/errors/missing-param-error'
import { badRequest, ok, serverError } from '@presentation/helpers/http-helper'
import { Controller } from '@presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@presentation/protocols/http'

export class CreateTicketController implements Controller {
  private readonly addTicket: AddTicket

  constructor(addTicket: AddTicket) {
    this.addTicket = addTicket
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { title, description, price, category, institution } = httpRequest.body
      const requiredFields = ['title', 'description', 'price', 'category', 'institution']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const ticket = await this.addTicket.add({
        title,
        description,
        price,
        category,
        institution,
      })
      return ok(ticket)
    } catch (error) {
      return serverError(error)
    }
  }
}
