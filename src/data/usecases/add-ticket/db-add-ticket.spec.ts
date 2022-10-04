import { TicketModel } from '@domain/models/ticket'
import { AddTicket, AddTicketModel } from '@domain/usecases/add-ticket'
import { AddTicketRepository } from '@data/protocols/add-ticket-repository'
import { DbAddTicket } from '@data/usecases/add-ticket/db-add-ticket'

const makeAddTicketRepository = (): AddTicketRepository => {
  class AddTicketRepositoryStub implements AddTicketRepository {
    async add(ticketData: AddTicketModel): Promise<TicketModel> {
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
  return new AddTicketRepositoryStub()
}

interface SutTypes {
  sut: AddTicket
  addTicketRepositoryStub: AddTicketRepository
}

const makeSut = (): SutTypes => {
  const addTicketRepositoryStub = makeAddTicketRepository()
  const sut = new DbAddTicket(addTicketRepositoryStub)
  return {
    sut,
    addTicketRepositoryStub,
  }
}

describe('DbAddTicket UseCase', () => {
  it('should call AddTicketRepository with correct values', async () => {
    const { sut, addTicketRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addTicketRepositoryStub, 'add')
    await sut.add({
      title: 'valid_title',
      description: 'valid_description',
      price: 55.0,
      category: 'valid_category',
      institution: 'valid_institution',
    })
    expect(addSpy).toHaveBeenCalledWith({
      title: 'valid_title',
      description: 'valid_description',
      price: 55.0,
      category: 'valid_category',
      institution: 'valid_institution',
    })
  })

  it('should throw if addTicketRepository throws', async () => {
    const { sut, addTicketRepositoryStub } = makeSut()
    jest
      .spyOn(addTicketRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add({
      title: 'valid_title',
      description: 'valid_description',
      price: 55.0,
      category: 'valid_category',
      institution: 'valid_institution',
    })
    await expect(promise).rejects.toThrow()
  })

  it('should return an ticket on success', async () => {
    const { sut } = makeSut()
    const ticket = await sut.add({
      title: 'valid_title',
      description: 'valid_description',
      price: 55.0,
      category: 'valid_category',
      institution: 'valid_institution',
    })
    expect(ticket).toEqual({
      id: 'valid_id',
      title: 'valid_title',
      description: 'valid_description',
      price: 55.0,
      category: 'valid_category',
      institution: 'valid_institution',
    })
  })
})
