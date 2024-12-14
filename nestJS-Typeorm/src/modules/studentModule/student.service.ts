import { Injectable } from '@nestjs/common';
import { StudentDTO } from './dto/student.dto';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
    constructor(private readonly studentRepository: StudentRepository) { }

    async saveStudent(body: StudentDTO): Promise<void> {
        await this.studentRepository.saveStudent(body);
    }

    async getStudents(){
        return this.studentRepository.getAllStudents();
    }

}