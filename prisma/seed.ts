import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample blog posts
  const posts = [
    {
      title: 'Welcome to Jeune Avenir Blog',
      content: 'This is our first blog post. We are excited to share our journey with you.',
      author: 'Admin',
      status: 'published',
      category: 'News',
      tags: ['welcome', 'introduction'],
      imageUrl: 'https://example.com/welcome.jpg',
      publishedAt: new Date(),
    },
    {
      title: 'Upcoming Events',
      content: 'Check out our upcoming events and join us in our mission.',
      author: 'Admin',
      status: 'draft',
      category: 'Events',
      tags: ['events', 'calendar'],
      imageUrl: 'https://example.com/events.jpg',
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.create({
      data: post,
    });
  }

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 