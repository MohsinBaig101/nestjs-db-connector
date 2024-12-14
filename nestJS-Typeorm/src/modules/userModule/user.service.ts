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
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

    constructor(
        private userRepository: UserRepository,
        @Logger() private logger: any,
        private configService: ConfigService
    ) { }


    public async getUsers(): Promise<User[]> {
        const logger = this.logger.child({
            serviceName: 'UserService'
        })
        logger.info('hi');
        return await this.userRepository.getUsers();
    }

    public async getUsersWhoHavePosts(): Promise<User[]> {
        const logger = this.logger.child({
            serviceName: 'UserService'
        })
        logger.info('hi');
        const users = await this.userRepository.getUsersWithPosts();
        return users;
    }

    public async saveUser(body: UserDTO): Promise<boolean> {
        const recordToInsert = this.userRepository.create({
            firstName: _.get(body, 'firstName'),
            lastName: _.get(body, 'lastName'),
            age: _.get(body, 'age'),
            dob: _.get(body, 'dob'),
            sex: _.get(body, 'sex'),
            email: _.get(body, 'email'),
            password: await bcrypt.hash(_.get(body, 'password'), Number(this.configService.get<number>('HASH_SALTROUND')))
        });
        await this.userRepository.save(recordToInsert);
        return true;
    }

    public async updateUser(userId: string, body: Omit<UserDTO, 'email' | 'password'>): Promise<boolean> {
        await this.userRepository.update(
            {
                id: userId,
            },
            {
                firstName: _.get(body, 'firstName'),
                lastName: _.get(body, 'lastName'),
                age: _.get(body, 'age'),
                dob: _.get(body, 'dob'),
                sex: _.get(body, 'sex')
            });

        throw new ForbiddenException();
        return true;
    }

    public async getUser(userId: string): Promise<Omit<UserDTO, "password" | "roles">> {
        const userObj = await this.userRepository.findOne({
            where: { id: userId }
        });

        console.log('Executing query:', userObj);

        return removeProperties(userObj, ['password']);
    }

}