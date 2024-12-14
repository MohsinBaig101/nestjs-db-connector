import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserSignup } from "./DTO/userSignup.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { User } from '../../models';
import * as bcrypt from 'bcrypt';
import { ConfigService } from "@nestjs/config";
import { Logger } from "src/decorators/winston";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel('users') private userModel: Model<User>,
        private configService: ConfigService,
        private jwtService: JwtService,
        @Logger() private logger: any
    ) { }
    public async signUp(body: UserSignup) {
        const logger = this.logger.child({
            serviceName: 'AuthService'
        });
        await this.userModel.insertMany({
            ...body,
            password: await bcrypt.hash(body.password, Number(this.configService.get<number>('HASH_SALTROUND')))
        });
        logger.info(`SignUp Completed Successfully, email: ${body?.email}`);
        return 'User signup';
    }

    public async signIn(body: { email: string, password: string }) {
        const user = await this.userModel.findOne({ email: body.email }).exec();
        if (!user) throw new UnauthorizedException('Invalid username and password');
        const result = await bcrypt.compare(body.password, user.password);
        if (!result) throw new UnauthorizedException('Invalid username and PPassword');
        return this.jwtService.signAsync({
            user, issuer: user.email,
            expires: Math.floor(Date.now() / 1000) + (60 * 60)
        });

    }
}