import type { NextFunction, Request, Response } from "express";
import httpError from "../../utils/httpError";
import type { ErrorType } from "../../utils/interfaces";

export default (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  const responseError = httpError(error as ErrorType);
  res.status(responseError.status).send(responseError);
};
