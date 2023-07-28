import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors";

const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Token is missing", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    res.locals = {
      id: Number(decoded.id),
      admin: decoded.admin,
    };
    return next();
  });
};

export default verifyToken;
