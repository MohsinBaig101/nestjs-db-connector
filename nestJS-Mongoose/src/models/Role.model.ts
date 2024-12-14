import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;


@Schema()
export class Role {
    @Prop({ required: true })
    name: string;

}

export const RoleSchema = SchemaFactory.createForClass(Role);
