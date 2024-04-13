import { NotFoundError } from '@mikro-orm/core';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof NotFoundError) {
      response.status(HttpStatus.NOT_FOUND).send({
        message: exception.message,
        timestamp: new Date().toISOString(),
        statusCode: HttpStatus.NOT_FOUND,
        path: request.url,
      });
    }
  }
}
