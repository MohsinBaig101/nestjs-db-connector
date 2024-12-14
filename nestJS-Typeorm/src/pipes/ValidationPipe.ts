
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { CustomValidationError } from '../errors/ValidationError';
@Injectable()
export class CustomValidationPipe implements PipeTransform {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        try {
            const body = value;
            const reqDTO = plainToInstance(metatype, body);
            await validateOrReject(reqDTO, { validationError: { target: false, value: false } });
            return body;
        } catch (error) {
            // customer Error Class
            throw new CustomValidationError('VALIDATION_ERROR', error);
        }
    }
}