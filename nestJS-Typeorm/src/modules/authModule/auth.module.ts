import { Module } from "@nestjs/common";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService): any => {
                return {
                    secret: configService.get('JWT_SECRET')
                };
            },
            inject: [ConfigService],
            global: true,
            imports: undefined
        })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }