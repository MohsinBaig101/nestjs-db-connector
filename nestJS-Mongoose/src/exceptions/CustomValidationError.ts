
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomValidationError } from '../errors/ValidationError';
import { validationErrorMapper } from '../lib/helpers';
@Catch(CustomValidationError)
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: CustomValidationError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatusCode
        const message = exception.getMessage;
        const errorCode = exception.getErrorCode;
        const errorArr = validationErrorMapper(exception.getError)
        response
            .status(status)
            .json(errorArr);
    }
}
