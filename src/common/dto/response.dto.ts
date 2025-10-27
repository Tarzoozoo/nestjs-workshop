import { HttpStatus } from '@nestjs/common';

export class Error {
  field?: string;
  message: string;
}

interface ResponseParams<T> {
  code: HttpStatus;
  message?: string;
  data: T;
  errors?: Error[];
}

export class ResponseDto<T> {
  code: HttpStatus;
  message?: string;
  result: { data: T; errors?: Error[] };

  constructor(params: ResponseParams<T>) {
    const { code, message, data, errors } = params;
    this.code = code;
    this.message = message;
    this.result = { data, errors };
  }
}
