import { Module } from "@nestjs/common";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from "../../models";
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService): any => {
                return {
                    secret: configService.get('JWT_SECRET')
                }
            },
            inject: [ConfigService],
            global: true
        })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }