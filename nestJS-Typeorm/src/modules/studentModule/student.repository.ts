import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { Student } from 'src/models/student.model';
import { StudentDTO } from './dto/student.dto';
import * as _ from 'lodash';

@Injectable()
export class StudentRepository extends Repository<Student> {
    constructor(private readonly dataSource: DataSource) {
        // Call the parent constructor with the repository instance
        const repository = dataSource.getRepository(Student);
        super(repository.target, repository.manager, repository.queryRunner);
    }

    // write the db queries function in this class
    async saveStudent(body: StudentDTO) {
        const record = this.create({
            name: _.get(body, 'name')
        });
        return this.save(record);
    }

    async getAllStudents(){
        return this.find();
    }
}
