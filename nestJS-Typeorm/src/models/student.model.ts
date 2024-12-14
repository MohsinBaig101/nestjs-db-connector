import { Column, CreateDateColumn, Entity, PrimaryColumn, Timestamp, BeforeInsert, UpdateDateColumn, OneToMany } from "typeorm";
import { Enrollment } from "./enrollment.model";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Student {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Enrollment, (enrollment) => enrollment.student_id)
    courses: Enrollment[]

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp

    @BeforeInsert()
    insertId() {
        if (!this.id) {
            this.id = uuidv4()
        }
    }
}