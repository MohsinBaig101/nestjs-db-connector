import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/userModule/user.repository';

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private userRepository: UserRepository) { }
    async validate(
        value: any,
        args?: ValidationArguments
    ): Promise<boolean> {
        // catch options from decorator
        // const { tableName, column }: IsUniqeInterface = args.constraints[0]

        // database query check data is exists
        const dataExist = await this.userRepository.findOne({
            where: {
                email: value || ''
            }
        });

        return !dataExist
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        // return custom field message
        const field: string = validationArguments.property
        return `${field} is already exist`
    }
}