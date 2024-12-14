import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { Course } from "./courses.model";
import { Student } from "./student.model";

@Entity()
export class Enrollment {
    @PrimaryColumn()
    @ManyToOne(() => Course, (course) => course.students)
    @JoinColumn({ name: 'course_id' })
    course_id: string;

    @PrimaryColumn()
    @ManyToOne(() => Student, (student) => student.courses)
    @JoinColumn({ name: 'student_id' })
    student_id: string
}