import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn,CreateDateColumn,UpdateDateColumn, BeforeInsert } from "typeorm";
import { User } from "./User.model";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Post {
    @PrimaryColumn()
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column({ type: "text" })
    description: string;

    @ManyToOne(() => User, (user) => user.posts, { nullable: true, onDelete: "RESTRICT" })
    @JoinColumn({ name: "user_id" })
    user_id: User;

    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    insertId(){
        if(!this.id){
            this.id = uuidv4()
        }
    }
}