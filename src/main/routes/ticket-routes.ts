import { Router } from 'express'
import { makeTicketController } from '../factories/add-ticket'
import { makeListTicketController } from '../factories/list-ticket'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeBuyTicketController } from '../factories/buy-ticket'
import { schemaValidator } from '../middlewares/schema-validator'
import { listTicketSchema } from './schemas/list-ticket'
import { createTicketSchema } from './schemas/create-ticket'
import { buyTicketSchema } from './schemas/buy-ticket'

export default (router: Router): void => {
  router.post('/ticket', schemaValidator(createTicketSchema), adaptRoute(makeTicketController()))
  router.get('/ticket', schemaValidator(listTicketSchema), adaptRoute(makeListTicketController()))
  router.post('/ticket/buy', schemaValidator(buyTicketSchema), adaptRoute(makeBuyTicketController()))
}
