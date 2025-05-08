import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    blog_image_url: string;

    @Prop({ required: true })
    content: string;

    @Prop({ type: Types.ObjectId, ref: 'Category' })
    category: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    author: Types.ObjectId;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
