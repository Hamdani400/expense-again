import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { BadRequestError } from "../errors/app.error";

export function validate(schema: z.ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const details = error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        return next(new BadRequestError("Validation Failed", details));
      }

      next();
    }
  };
}
