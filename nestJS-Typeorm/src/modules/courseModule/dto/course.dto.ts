import { IsNotEmpty } from "class-validator";

export class CourseDTO{
    @IsNotEmpty()
    name:string
}