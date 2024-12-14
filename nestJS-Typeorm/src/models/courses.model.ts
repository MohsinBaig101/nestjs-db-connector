import { Column, CreateDateColumn, Entity, PrimaryColumn, Timestamp, UpdateDateColumn, OneToMany, BeforeInsert } from "typeorm";
import { Enrollment } from "./enrollment.model";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Course {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Enrollment, (enrollment) => enrollment.course_id)
    students: Enrollment[]

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp

    @BeforeInsert()
    insertId(){
        if(!this.id){
            this.id = uuidv4()
        }
    }
}