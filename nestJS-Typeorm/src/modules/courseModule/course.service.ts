import { Injectable } from '@nestjs/common';
import { CourseRepository } from './course.repository';
import { CourseDTO } from './dto/course.dto';
import { Enrollment } from 'src/models/enrollment.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
    constructor(
        private readonly courseRepository: CourseRepository,
        @InjectRepository(Enrollment) private enrollmentRepository: Repository<Enrollment>,
    ) { }

    async saveCourse(body: CourseDTO) {
        return await this.courseRepository.insertCourse(body)
    }

    async enrollStudent(body: { courseId: string, studentId: string }) {
        await this.enrollmentRepository.insert({
            course_id: body?.courseId,
            student_id: body?.studentId
        })
    } 

    async eachCoursesStudent() {
        await this.enrollmentRepository.createQueryBuilder("")
    }

    async getCourses(){
        return this.courseRepository.getCourses()
    }

}