import { IsNotEmpty } from "class-validator";

export class PostDTO {
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    description:string;

    @IsNotEmpty()
    userId:string;
}