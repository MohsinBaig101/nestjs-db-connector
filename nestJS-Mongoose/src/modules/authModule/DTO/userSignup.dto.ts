import { IsNotEmpty } from "class-validator";


export class UserSignup{
    
    firstName: string;

    lastName: string;

    age: number;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}