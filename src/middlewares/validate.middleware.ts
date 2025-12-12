import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json(error);
        return;
      }
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };
}
