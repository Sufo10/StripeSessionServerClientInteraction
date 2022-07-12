import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.message);
  if (res.headersSent) {
    return next(err);
  }
  res
    .status(res.statusCode || 500)
    .json({ message: err.message || "An Unknown Error Occured." });
};
