import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../models/User.model';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private readonly dataSource: DataSource) {
        // Call the parent constructor with the repository instance
        const repository = dataSource.getRepository(User);
        super(repository.target, repository.manager, repository.queryRunner);
    }
    async getUsers(): Promise<User[]> {
        return this.createQueryBuilder("users").getMany();
    }

    async getUsersWithPosts() {
        const query = this.createQueryBuilder("users")
            .select(["users.id"])
            .innerJoinAndSelect("users.posts","posts","posts.user_id=users.id") 
            .addSelect(["posts.id", "posts.name", "posts.description"]);
        console.log(await query.getQuery());
        const result = await query.getMany();
        return result;
        // console.log(await this.find({ relations: ["posts"] }).getQuery())
        // return this.find({ relations: ["posts"] })
    }

    async getUser(id: string): Promise<User | null> {
        return this.findOne({ where: { id } });
    }

    async createUser(user: { firstName: string; lastName: string; isActive: boolean }): Promise<User> {
        const newUser = this.create(user);
        return this.save(newUser);
    }
}
