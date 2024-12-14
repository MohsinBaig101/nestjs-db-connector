import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { Course } from 'src/models/courses.model';
import { CourseDTO } from './dto/course.dto';
import * as _ from 'lodash';

@Injectable()
export class CourseRepository extends Repository<Course> {
    constructor(private readonly dataSource: DataSource) {
        // Call the parent constructor with the repository instance
        const repository = dataSource.getRepository(Course);
        super(repository.target, repository.manager, repository.queryRunner);
    }

    // write the db queries function in this class

    async insertCourse(body: CourseDTO) {
        const record = this.create({
            name: _.get(body, 'name')
        })
        return this.save(record);
    }

    async getCourses(): Promise<Course[]> {
        return this.find();
    }
}
