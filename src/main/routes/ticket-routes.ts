import { Router } from 'express'
import { makeTicketController } from '../factories/ticket'
import { adaptRoute } from '../adapters/express-routes-adapter'

export default (router: Router): void => {
  router.post('/ticket', adaptRoute(makeTicketController()))
}
