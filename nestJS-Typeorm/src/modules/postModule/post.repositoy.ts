import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../../models/post.model';
import { DataSource } from 'typeorm';

@Injectable()
export class PostRepository extends Repository<Post> {
    constructor(private readonly dataSource: DataSource) {
        // Call the parent constructor with the repository instance
        const repository = dataSource.getRepository(Post);
        super(repository.target, repository.manager, repository.queryRunner);
    }
    
    // write the db queries function in this class
}
