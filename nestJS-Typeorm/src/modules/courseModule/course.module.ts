import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/models/courses.model';
import { CourseRepository } from './course.repository';
import { Enrollment } from 'src/models/enrollment.model';


@Module({
    imports: [TypeOrmModule.forFeature([Course,Enrollment])],
    controllers: [CourseController],
    providers: [CourseService, CourseRepository],
})
export class CourseModule { };