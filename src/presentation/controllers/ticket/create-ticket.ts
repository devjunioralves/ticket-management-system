import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class CreateTicketController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['title', 'description', 'price', 'category', 'institution']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    return new Promise((resolve) => resolve({ statusCode: 200, body: {} }))
  }
}
