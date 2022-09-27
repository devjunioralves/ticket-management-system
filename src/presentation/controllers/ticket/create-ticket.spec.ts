import { MissingParamError } from '../../errors/missing-param-error'
import { CreateTicketController } from './create-ticket'

const makeSut = (): CreateTicketController => {
  const sut = new CreateTicketController()
  return sut
}
describe('Create Ticket Controller', () => {
  it('should return 400 if no institution is provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        title: 'any_title',
        description: 'any_description',
        price: 55.0,
        category: 'any_category',
      },
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('institution'))
  })
})
