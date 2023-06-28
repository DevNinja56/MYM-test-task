import { NextFunction, Request, Response } from "express"
import { AnySchema } from "yup"

/**
 * Middleware for validating data
 */
const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate(req.body)
    return next()
  } catch (error) {
    return res.status(500).json({ type: (error as Error).name, message: (error as Error).message })
  }
}

export default validate
