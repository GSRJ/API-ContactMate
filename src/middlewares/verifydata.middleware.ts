import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const verifyData =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    if (req.body.id) {
      res.locals.targetUser = req.body.id;
    }
    const validatedData = schema.parse(req.body);

    req.body = validatedData;

    return next();
  };

export default verifyData;
