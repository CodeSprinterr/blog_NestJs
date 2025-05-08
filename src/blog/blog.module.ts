// blog.module.ts
import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blog.schema';
import { CategoryModule } from '../category/category.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    CategoryModule,
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
