import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateBody = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        statusCode: 400,
        message: "Validation failed",
        errors: result.error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }
    req.body = result.data; // validated and typed
    next();
  };
};
