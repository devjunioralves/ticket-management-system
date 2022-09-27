import { HttpRequest, HttpResponse } from '../../protocols/http'

export class CreateTicketController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise((resolve) => resolve({ statusCode: 400, body: 'any_body' }))
  }
}
