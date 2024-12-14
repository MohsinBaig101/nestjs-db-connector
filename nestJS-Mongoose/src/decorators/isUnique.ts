import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { IsUniqueConstraint } from '../lib/validation/IsUniqueClass';
export function isUnique(options?: any, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isUnique',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: IsUniqueConstraint,
        })
    }
}