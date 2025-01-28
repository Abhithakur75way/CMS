import { body, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// This is the validateCreateForm middleware
export const validateCreateForm: ValidationChain[] = [
  body('formName').notEmpty().withMessage('Form name is required'),
  body('fields').isArray().withMessage('Fields must be an array'),
  body('fields.*.fieldName').notEmpty().withMessage('Field name is required'),
  body('fields.*.fieldType').isIn(['text', 'email', 'number', 'checkbox', 'dropdown']).withMessage('Invalid field type'),
];

// Middleware for error handling (validationResult)
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
