import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Error, ResponseDto } from '@/common/dto/response.dto';
import { ZodValidationException } from 'nestjs-zod';
import z, { ZodError } from 'zod';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let data: unknown = null;
    const errors: Error[] = [];

    if (exception instanceof HttpException) {
      console.log('HttpException');
      status = exception.getStatus();
      message = exception.message || message;
    }

    if (exception instanceof ZodValidationException) {
      const zodError = exception.getZodError() as ZodError;
      console.log('ZodValidationException', zodError);
      data = z.treeifyError(zodError);
    }

    const responseDto = new ResponseDto({
      code: status,
      message: message,
      data: data,
      errors: errors,
    });
    response.status(status).json(responseDto);
  }
}
