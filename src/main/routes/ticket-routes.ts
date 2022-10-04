import { Router } from 'express'
import { makeTicketController } from '@main/factories/add-ticket'
import { makeListTicketController } from '@main/factories/list-ticket'
import { adaptRoute } from '@main/adapters/express-routes-adapter'
import { makeBuyTicketController } from '@main/factories/buy-ticket'
import { schemaValidator } from '@main/middlewares/schema-validator'
import { listTicketSchema } from '@main/routes/schemas/list-ticket'
import { createTicketSchema } from '@main/routes/schemas/create-ticket'
import { buyTicketSchema } from '@main/routes/schemas/buy-ticket'

export default (router: Router): void => {
  router.post('/ticket', schemaValidator(createTicketSchema), adaptRoute(makeTicketController()))
  router.get('/ticket', schemaValidator(listTicketSchema), adaptRoute(makeListTicketController()))
  router.post('/ticket/buy', schemaValidator(buyTicketSchema), adaptRoute(makeBuyTicketController()))
}
