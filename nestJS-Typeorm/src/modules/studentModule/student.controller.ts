import { Controller, Get, Post, Body, UseFilters } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDTO } from './dto/student.dto';
import { CustomValidationPipe } from 'src/pipes/ValidationPipe';
import { CustomValidationError } from 'src/errors/ValidationError';
import { CustomExceptionFilter } from 'src/exceptions/CustomValidationError';

@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    @Get()
    async getStudent() {
        return this.studentService.getStudents()
    }

    /**
     * Possible things which we can on Route
     * Custom Exception Class - like for Validation Error
     * Custom Pipe - Custom Validation handler class created
     * Guards - Check the roles or permission
     * Remaining things like swagger decorators
     */
    @Post("")
    @UseFilters(CustomExceptionFilter)
    async saveStudent(@Body(CustomValidationPipe) body: StudentDTO) {
        return this.studentService.saveStudent(body);
    }
}