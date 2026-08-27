import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, ZodError } from 'zod';

export const validateRequest = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.reduce((acc, curr) => {
          const key = curr.path.join('.');
          acc[key] = curr.message;
          return acc;
        }, {} as Record<string, string>);

        res.status(400).json({
          success: false,
          message: 'Validation failed. Please check your inputs.',
          errors: formattedErrors,
        });
        return;
      }
      next(error);
    }
  };
};
