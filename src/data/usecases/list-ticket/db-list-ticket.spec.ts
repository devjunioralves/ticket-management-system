import { TicketModel } from '../../../domain/models/ticket'
import { ListTicket, ListTicketFilter } from '../../../domain/usecases/list-ticket'
import { ListTicketRepository } from '../../protocols/list-ticket-repository'
import { DbListTicket } from './db-list-ticket'

const makeListTicketRepository = (): ListTicketRepository => {
  class ListTicketRepositoryStub implements ListTicketRepository {
    async list(ticket: ListTicketFilter): Promise<TicketModel[]> {
      return await new Promise((resolve) =>
        resolve([
          {
            id: 'valid_id',
            title: 'valid_title',
            description: 'valid_description',
            price: 55.0,
            category: 'valid_category',
            institution: 'valid_institution',
          },
        ]),
      )
    }
  }
  return new ListTicketRepositoryStub()
}

interface SutTypes {
  sut: ListTicket
  listTicketRepositoryStub: ListTicketRepository
}

const makeSut = (): SutTypes => {
  const listTicketRepositoryStub = makeListTicketRepository()
  const sut = new DbListTicket(listTicketRepositoryStub)
  return {
    sut,
    listTicketRepositoryStub,
  }
}

describe('DbListTickets useCases', () => {
  it('should call ListTicketRepository with correct values', async () => {
    const { sut, listTicketRepositoryStub } = makeSut()
    const listSpy = jest.spyOn(listTicketRepositoryStub, 'list')
    const filtersRequest = {
      title: 'valid_title',
      institution: 'valid_institution',
    }
    await sut.list(filtersRequest)
    expect(listSpy).toHaveBeenCalledWith({
      title: 'valid_title',
      institution: 'valid_institution',
    })
  })
})
