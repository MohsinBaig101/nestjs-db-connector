import { Controller, Get, Post, Body } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDTO } from './dto/course.dto';

@Controller('courses')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }

    @Get("/")
    async getCourses() {
        return this.courseService.getCourses()
    }

    @Post("")
    async saveCourse(@Body() body: CourseDTO) {
        return this.courseService.saveCourse(body)
    }

    @Post("/enroll")
    async enrollStudentInCourse(@Body() body: { courseId: string, studentId: string }) {
        return this.courseService.enrollStudent(body)
    }

    @Get("/enroll/courses")
    async eachCoursesStudent() {
        return this.courseService.eachCoursesStudent()
    }
}