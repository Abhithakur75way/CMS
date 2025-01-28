// src/common/utils/controller.utils.ts
import { Response } from 'express';

export const sendSuccess = (res: Response, data: any, message = 'Success', status = 200) => {
  res.status(status).json({ message, data });
};

export const throwError = (message: string, status = 400): never => {
  const error: any = new Error(message);
  error.status = status;
  throw error;
};
