import { Module, MiddlewareConsumer } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserSchema } from "../../models";
import { AuthMiddleware } from '../../middleware/AuthMiddleware';
import { IsUniqueConstraint } from '../../lib/validation/IsUniqueClass';
import { RoleSchema } from "src/models/Role.model";
// import { ConfigService } from "@nestjs/config";
// import { AuthGuard } from "../../guards/Authorize";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'users', schema: UserSchema },
      { name: 'roles', schema: RoleSchema },
    ])
  ],
  controllers: [UserController],
  providers: [UserService, IsUniqueConstraint],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/users'); // Apply to all routes
  }
}
