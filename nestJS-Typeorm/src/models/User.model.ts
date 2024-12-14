import { Entity, Column, PrimaryColumn, BeforeInsert, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Post } from './post.model';

@Entity()
export class User {
    constructor() {
        if (!this.id) {
            this.id = uuidv4(); // Generate a UUID if not already provided
        }
    }
    @PrimaryColumn('uuid')
    id: string;

    @Column({ length: 100 })
    firstName: string;

    @Column({ length: 100 })
    lastName: string;

    @Column()
    age: number;

    @Column({ length: 100 })
    password: string;

    @Column({ length: 100 })
    email: string;

    @Column({ length: 100 })
    dob: string;

    @Column({ length: 100 })
    sex: string;

    @OneToMany(() => Post, (post) => post.user_id)
    posts: Post[]

    @BeforeInsert()
    generateId() {
        console.log('hooks called')
        if (!this.id) {
            this.id = uuidv4(); // Generate UUID if not provided
        }
    }

}

