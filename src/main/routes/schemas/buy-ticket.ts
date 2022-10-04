import Joi from 'joi'

export const buyTicketSchema = Joi.object({
  body: Joi.object().keys({
    ticketId: Joi.string().required(),
    customerId: Joi.string().required(),
    customerName: Joi.string().required(),
    customerEmail: Joi.string().required(),
    customerMobile: Joi.string().required(),
    customerDocument: Joi.string().required(),
    paymentType: Joi.string().required(),
    total: Joi.number().required(),
  }),
})
