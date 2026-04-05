import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';

export function validateInput(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Validation failed', issues: error.issues });
      }
      return res.status(400).json({ error: 'Invalid request' });
    }
  };
}