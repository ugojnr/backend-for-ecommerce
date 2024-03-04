import { NextFunction } from "express";
import { ErrorCodes, HttpException } from "./Exceptions/root";
import { internalException } from "./Exceptions/internal-exception";

export const errorHandler = (method: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      method(req, res, next);
    } catch (error: any) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else {
        exception = new internalException(
          "something went wrong",
          error,
          ErrorCodes.INTERNAL_EXCEPTION
        );
      }
      next(exception);
    }
  };
};
