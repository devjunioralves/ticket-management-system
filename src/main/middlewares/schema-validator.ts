import { Request, Response, NextFunction } from 'express'

export const schemaValidator = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
  if (Object.values(req.query).length) {
    const { error } = schema.validate({ query: req.query })
    if (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  if (Object.values(req.params).length) {
    const { error } = schema.validate({ params: req.params })
    if (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  if (Object.values(req.body).length) {
    const { error } = schema.validate({ body: req.body })
    if (error) {
      return res.status(400).json({ error: error.message })
    }
  }
  next()
}
