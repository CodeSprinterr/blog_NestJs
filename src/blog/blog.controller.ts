import { Controller, Get, Param, UseGuards, Req, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('api/blogs')
@UseGuards(JwtAuthGuard)
export class BlogController {
    constructor(private blogService: BlogService) { }

    @Get()
    getMyBlogs(
        @Req() req: any,
        @Query('search') search?: string,
        @Query('category') category?: string
    ) {
        return this.blogService.getMyBlogs(req.user.userId, search, category);
    }

    @Get(':id')
    @UseGuards()
    getBlogById(@Param('id') id: string) {
        return this.blogService.getBlogById(id);
    }
}
