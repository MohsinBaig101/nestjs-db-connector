import { Module, MiddlewareConsumer } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User } from "../../models";
import { AuthMiddleware } from '../../middleware/AuthMiddleware';
import { IsUniqueConstraint } from '../../lib/validation/IsUniqueClass';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService, IsUniqueConstraint,UserRepository
  ],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/users'); // Apply to all routes
  }
}
