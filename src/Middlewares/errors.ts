import { error } from "console"
import { NextFunction, Request, Response } from "express"
import { ErrorCodes, HttpException } from "../Exceptions/root"



export const errorMiddleware = (error: HttpException, req:Request, res:Response, next: NextFunction) => {
    res.status(error.statusCode).json({
       ErrorCodes:error.errorCode,
        message: error.message,
        error:error.errors
    })
}