import Joi from 'joi'

export const listTicketSchema = Joi.object({
  query: Joi.object({
    title: Joi.string().optional(),
    institution: Joi.string().optional(),
  }).optional(),
})
