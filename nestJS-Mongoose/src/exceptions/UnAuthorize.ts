
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { UnAuthorizedError } from 'src/errors/UnAuthorized';

@Catch(UnAuthorizedError)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: UnAuthorizedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatusCode
        const message = exception.getMessage;
        const errorCode = exception.getErrorCode;
        console.log(errorCode, message, status)
        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                message: message,
                errorCode
            });
    }
}
