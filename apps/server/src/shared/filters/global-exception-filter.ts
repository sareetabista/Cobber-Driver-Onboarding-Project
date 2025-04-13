/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let errorResponse = {
      success: false,
      statusCode: status,
      message: 'Internal Server Error',
      error: ['Unknown error occured'],
    };

    console.log(exception);
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      errorResponse = {
        success: false,
        statusCode: status,
        error: exceptionResponse['message'] || exception.message,
        message: exceptionResponse['error'] || exception.name,
      };
    } else if (exception?.name === 'MongoServerError') {
      status = 400;
      errorResponse = {
        success: false,
        statusCode: status,
        message: 'Database Error',
        error: [exception.message],
      };
    } else if (exception.name === 'ValidationError') {
      status = 400;
      errorResponse = {
        success: false,
        statusCode: status,
        message: 'Validation Failed!',
        error: exception.message,
      };
    }
    return response.status(status).json(errorResponse);
  }
}
