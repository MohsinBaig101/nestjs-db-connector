import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { isUnique } from '../../decorators/isUnique';

class Education {

    @IsNotEmpty()
    schoolName: string;

    passYear: string;

    grade: string;
}

class User {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    age: number;

    @IsNotEmpty()
    dob: string;

    sex: string;

    @ValidateNested({ each: true })
    @Type(() => Education)
    educations: Education[];

    @IsOptional()
    roles:string[]
}

export class UserDTO extends User {
    @IsNotEmpty()
    @isUnique()
    email: string;

    @IsNotEmpty()
    password: string;
}
export class UserPutDTO extends User {}