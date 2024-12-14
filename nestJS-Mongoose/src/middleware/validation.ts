import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        console.log(metatype, value);
        const object = plainToInstance(metatype, value);
        console.log(object);
        const errors = await validate(object, {
            stopAtFirstError: false
        });
        if (errors.length > 0) {
            const a = errors.map(err => {
                return { [err.property]: err.constraints }
            })
            throw new BadRequestException(a);
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}