import { TicketModel } from '../../../domain/models/ticket'
import { AddTicket, AddTicketModel } from '../../../domain/usecases/add-ticket'
import { MissingParamError } from '../../errors/missing-param-error'
import { ServerError } from '../../errors/server-error'
import { CreateTicketController } from './create-ticket'

const makeAddTicket = (): AddTicket => {
  class AddTicketStub implements AddTicket {
    async add(ticket: AddTicketModel): Promise<TicketModel> {
      return await new Promise((resolve) =>
        resolve({
          id: 'valid_id',
          title: 'valid_title',
          description: 'valid_description',
          price: 55.0,
          category: 'valid_category',
          institution: 'valid_institution',
        }),
      )
    }
  }
  return new AddTicketStub()
}
interface SutTypes {
  sut: CreateTicketController
  addTicketStub: AddTicket
}
const makeSut = (): SutTypes => {
  const addTicketStub = makeAddTicket()
  const sut = new CreateTicketController(addTicketStub)
  return {
    sut,
    addTicketStub,
  }
}

describe('Create Ticket Controller', () => {
  it('should return 400 if no institution is provided', async () => {
    const { sut } = makeSut()
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

  it('should call addTicket with correct values', async () => {
    const { sut, addTicketStub } = makeSut()
    const addSpy = jest.spyOn(addTicketStub, 'add')
    const httpRequest = {
      body: {
        title: 'any_title',
        description: 'any_description',
        price: 55.0,
        category: 'any_category',
        institution: 'any_institution',
      },
    }

    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      title: 'any_title',
      description: 'any_description',
      price: 55.0,
      category: 'any_category',
      institution: 'any_institution',
    })
  })

  it('should return 500 if addTicket throws', async () => {
    const { sut, addTicketStub } = makeSut()
    jest.spyOn(addTicketStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        title: 'any_title',
        description: 'any_description',
        price: 55.0,
        category: 'any_category',
        institution: 'any_institution',
      },
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(null!))
  })
})
