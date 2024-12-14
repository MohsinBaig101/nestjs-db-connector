import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role, RoleSchema } from './Role.model';
import * as mongoose from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
class Education {
    @Prop({ required: true })
    schoolName: string;

    @Prop()
    passYear: string;

    @Prop()
    grade: string;
}

@Schema()
export class User {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    age: number;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    dob: string;

    @Prop({ required: true })
    sex: string;

    @Prop({ schema: Education })
    educations: Education[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'roles' }] })
    roles: Role[];
}



export const UserSchema = SchemaFactory.createForClass(User);
