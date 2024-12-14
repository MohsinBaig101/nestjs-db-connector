import {
    Body,
    Controller,
    Get,
    UseFilters,
    Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDTO } from './dto/post.dto';
import { CustomValidationPipe } from 'src/pipes/ValidationPipe';
import { CustomExceptionFilter } from 'src/exceptions/CustomValidationError';

@Controller("posts")
export class PostController {
    constructor(
        private readonly postService: PostService
    ) { }

    @UseFilters(CustomExceptionFilter)
    @Post("")
    public async createPost(@Body(CustomValidationPipe) body: PostDTO) {
        await this.postService.savePost(body);
        return;
    }

    @Get("")
    public async getPosts() {
        const result = await this.postService.getPosts();
        return result;
    }
}