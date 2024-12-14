import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../models';
import { Model } from 'mongoose';
// import { IsUniqeInterface } from '../../interfaces/internal';
@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(@InjectModel('users') private userModel: Model<User>,) { }
    async validate(
        value: any,
        args?: ValidationArguments
    ): Promise<boolean> {
        // catch options from decorator
        // const { tableName, column }: IsUniqeInterface = args.constraints[0]

        // database query check data is exists
        const dataExist = await this.userModel.findOne(
            {
                email: value || '',
            });

        return !dataExist
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        // return custom field message
        const field: string = validationArguments.property
        return `${field} is already exist`
    }
}