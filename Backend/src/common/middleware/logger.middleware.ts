// src/common/middleware/logger.middleware.ts
import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.originalUrl}`);
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`Request ${req.method} ${req.originalUrl} - ${res.statusCode} [${duration}ms]`);
  });

  next();
};
