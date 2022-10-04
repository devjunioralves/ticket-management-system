import { TicketModel } from '@domain/models/ticket'
import { ListTicket, ListTicketFilter } from '@domain/usecases/list-ticket'
import { ServerError } from '@presentation/errors/server-error'
import { ListTicketController } from '@presentation/controllers/list-ticket/list-ticket'

const makeListTicket = (): ListTicket => {
  class ListTicketStub implements ListTicket {
    async list(filters: ListTicketFilter): Promise<TicketModel[]> {
      return new Promise((resolve) =>
        resolve([
          {
            id: 'any_id',
            title: 'any_title',
            description: 'any_description',
            price: 55.0,
            category: 'any_category',
            institution: 'any_institution',
          },
        ]),
      )
    }
  }
  return new ListTicketStub()
}

interface SutTypes {
  sut: ListTicketController
  listTicketStub: ListTicket
}

const makeSut = (): SutTypes => {
  const listTicketStub = makeListTicket()
  const sut = new ListTicketController(listTicketStub)
  return {
    sut,
    listTicketStub,
  }
}

describe('List Ticket Controller', () => {
  it('should call listTicket with correct values', async () => {
    const { sut, listTicketStub } = makeSut()
    const listSpy = jest.spyOn(listTicketStub, 'list')
    const httpRequest = {
      query: {
        title: 'any_title',
        institution: 'any_institution',
      },
    }

    await sut.handle(httpRequest)
    expect(listSpy).toHaveBeenCalledWith({
      title: 'any_title',
      institution: 'any_institution',
    })
  })

  it('should return 200 and data', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      query: {
        title: 'any_title',
        institution: 'any_institution',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual([
      {
        id: 'any_id',
        title: 'any_title',
        description: 'any_description',
        price: 55.0,
        category: 'any_category',
        institution: 'any_institution',
      },
    ])
  })

  it('should return 500 if listTicket throws', async () => {
    const { sut, listTicketStub } = makeSut()
    jest.spyOn(listTicketStub, 'list').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      query: {
        title: 'any_title',
        institution: 'any_institution',
      },
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(null!))
  })
})
