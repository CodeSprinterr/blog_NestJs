import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { User, UserSchema } from './users/user.schema';
import { BlogModule } from './blog/blog.module';
import { Category, CategorySchema } from './category/category.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    AuthModule,
    User,
    BlogModule,
    Category,
  ],
})
export class AppModule {}
