import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/constants/error-code.constants';
import { BaseError } from './base.error';

export class DatabaseError extends BaseError {
  constructor(
    message: string | Record<string, unknown>,
    errorCode?: number,
    cause?: Error,
  ) {
    super(
      message,
      HttpStatus.BAD_REQUEST,
      errorCode ?? ErrorCode.DATABASE_ERROR,
      cause,
    );
  }
}
