import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repositoy';
import { PostDTO } from './dto/post.dto';
import * as _ from 'lodash';

@Injectable()
export class PostService {
    constructor(private readonly postRepository: PostRepository) { }

    async savePost(body: PostDTO): Promise<undefined> {
        const postObj = this.postRepository.create({
            name: _.get(body, 'name'),
            description: _.get(body, 'description'),
            user_id: _.get(body, 'userId')
        })
        await this.postRepository.save(postObj);
        return;
    }

    async getPosts() {
        const posts = await this.postRepository.createQueryBuilder('post')
            .select(["post.id","post.name","post.description"])
            .addSelect(["user_id as user","users"])
            .innerJoin("post.user_id","users")
            .getMany();
        console.log("Posts",posts)
        return posts;
    }
}