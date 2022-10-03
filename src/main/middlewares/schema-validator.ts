import { Request, Response, NextFunction } from 'express'

export const schemaValidator = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
    })
    return next()
  } catch (err) {
    res.status(400).json({
      name: err.name,
      error: err.message,
    })
  }
}
