// seeder.ts
import mongoose from 'mongoose';
import { Category, CategorySchema } from './src/category/category.schema';
import { Blog, BlogSchema } from './src/blog/blog.schema';
import { User, UserSchema } from './src/users/user.schema';

async function bootstrap() {
    // 👇 Replace with your real DB connection string
    const MONGO_URI = 'mongodb://localhost:27017/mini-blog';

    const connection = await mongoose.connect(MONGO_URI);
    const categoryModel = connection.model('Category', CategorySchema);
    const blogModel = connection.model('Blog', BlogSchema);
    const userModel = connection.model('User', UserSchema);

    const categories = [
        { name: 'Technology' },
        { name: 'Health' },
        { name: 'Travel' },
        { name: 'Education' },
    ];

    // 👤 Create user
    const existingUser = await userModel.findOne({ email: 'demo@example.com' });
    const user =
        existingUser ||
        (await userModel.create({
            name: 'Demo User',
            email: 'demo@example.com',
            password: '$2b$10$examplehashvaluefrombcrypt',
            createdAt: new Date(),
        }));

    // 📂 Insert categories if not present
    const existingCategories = await categoryModel.find();
    if (existingCategories.length === 0) {
        await categoryModel.insertMany(categories);
        console.log('✅ Categories seeded');
    }

    const allCategories = await categoryModel.find();

    // 📝 Insert blog posts if not present
    const blogCount = await blogModel.countDocuments();
    if (blogCount === 0) {
        await blogModel.create([
            {
                title: 'Tech in 2025',
                blog_image_url: 'https://via.placeholder.com/600',
                content: 'Exploring the latest in AI, IoT, and more...',
                category: allCategories[0]._id,
                author: user._id,
                createdAt: new Date(),
            },
            {
                title: 'Healthy Living Tips',
                blog_image_url: 'https://via.placeholder.com/600',
                content: 'How to maintain a balanced lifestyle.',
                category: allCategories[1]._id,
                author: user._id,
                createdAt: new Date(),
            },
        ]);
        console.log('✅ Blogs seeded');
    }

    await connection.disconnect();
    process.exit(0);
}

bootstrap().catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
});
