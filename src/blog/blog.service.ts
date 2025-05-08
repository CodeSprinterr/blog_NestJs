import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './blog.schema';
import { Model, Types  } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
    constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) { }

    async getMyBlogs(userId: string, search?: string, category?: string) {
        const query: any = { author: new Types.ObjectId(userId) }; 

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        if (category) {
            query.category = category;
        }

        return this.blogModel.find(query).populate('category').populate('author');
    }

    async getBlogById(id: string) {
        return this.blogModel.findById(id).populate('category').populate('author');
    }
}
