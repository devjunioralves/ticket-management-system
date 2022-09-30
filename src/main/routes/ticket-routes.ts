import { Router } from 'express'
import { makeTicketController } from '../factories/add-ticket'
import { makeListTicketController } from '../factories/list-ticket'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeBuyTicketController } from '../factories/buy-ticket'

export default (router: Router): void => {
  router.post('/ticket', adaptRoute(makeTicketController()))
  router.get('/ticket', adaptRoute(makeListTicketController()))
  router.post('/ticket/buy', adaptRoute(makeBuyTicketController()))
}
