import { Model } from 'mongoose';
import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../models';
import { Logger } from '../../decorators/winston';
import * as _ from 'lodash';
import { UserDTO } from "./user.dto";
import * as bcrypt from "bcrypt";
import { ConfigService } from '@nestjs/config';
import { removeProperties } from '../../lib/helpers';
import { Role, RoleSchema } from 'src/models/Role.model';
@Injectable()
export class UserService {

    constructor(
        @InjectModel('users') private userModel: Model<User>,
        @Logger() private logger: any,
        private configService: ConfigService
    ) { }


    public async getUsers(): Promise<User[]> {
        const logger = this.logger.child({
            serviceName: 'UserService'
        })
        logger.info('hi');
        return await this.userModel.find();
    }

    public async saveUser(body: UserDTO): Promise<boolean> {
        await this.userModel.insertMany({
            firstName: _.get(body, 'firstName'),
            lastName: _.get(body, 'lastName'),
            age: _.get(body, 'age'),
            dob: _.get(body, 'dob'),
            sex: _.get(body, 'sex'),
            email: _.get(body, 'email'),
            password: await bcrypt.hash(_.get(body, 'password'), Number(this.configService.get<number>('HASH_SALTROUND'))),
            educations: _.get(body, 'educations'),
            roles: _.get(body, 'roles'),
        });
        return true;
    }

    public async updateUser(userId: string, body: Omit<UserDTO, 'email' | 'password'>): Promise<boolean> {
        await this.userModel.updateOne(
            {
                _id: userId,
            },
            {
                firstName: _.get(body, 'firstName'),
                lastName: _.get(body, 'lastName'),
                age: _.get(body, 'age'),
                dob: _.get(body, 'dob'),
                sex: _.get(body, 'sex'),
                educations: _.get(body, 'educations')
            });

        throw new ForbiddenException();
        return true;
    }

    public async getUser(userId: string): Promise<Omit<UserDTO, "password" | "roles">> {
        const userObj = await this.userModel.findOne(
            {
                _id: userId,
            }).populate({
                path: "roles",
                match: {
                    name: { $eq: "admin" }
                }
            }).lean();

        console.log('Executing query:', userObj);

        return removeProperties(userObj, ['password']);
    }

}