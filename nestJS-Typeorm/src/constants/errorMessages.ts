import { HttpCode } from "@nestjs/common";

export const errorMessages = {
    'UNAUTHORIZED_VIEW': { code: 810009, statusCode: 401, message: 'User do not have a permissions' },
    'VALIDATION_ERROR': { code: 810008, statusCode: 400, message: 'Validation Error' }
}