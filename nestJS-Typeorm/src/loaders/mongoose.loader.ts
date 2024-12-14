import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({})
export class CustomMongooseModule extends MongooseModule {
    constructor() {
        super();
    }
}