import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function errorHandler(err: Error | AppError, _req: Request, res: Response, _next: NextFunction) {
  const isDev = process.env.NODE_ENV === 'development';

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      ...(isDev ? { stack: err.stack } : {}),
    });
  }

  return res.status(500).json({
    error: 'Internal server error',
    ...(isDev ? { details: err.message } : {}),
  });
}