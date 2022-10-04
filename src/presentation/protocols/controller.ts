import { HttpResponse, HttpRequest } from '@presentation/protocols/http'

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
