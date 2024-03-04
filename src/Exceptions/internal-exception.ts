import { HttpException } from "./root";

export class internalException extends HttpException {
  constructor(message: string, errorCode: number, error: any) {
    super(message, errorCode, 500, error);
  }
}
