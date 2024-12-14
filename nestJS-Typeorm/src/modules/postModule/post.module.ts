import { Module, MiddlewareConsumer } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { PostRepository } from "./post.repositoy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "src/models/post.model";

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {
  // configure(consumer: MiddlewareConsumer) {
  //   // consumer.apply(AuthMiddleware).forRoutes('/users'); // Apply to all routes
  // }
}
