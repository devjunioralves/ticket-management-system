import Joi from 'joi'

export const createTicketSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().required(),
    institution: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
  }).required(),
})
