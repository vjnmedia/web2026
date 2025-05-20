import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all blog posts
export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

// POST new blog post
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        status: data.status,
        category: data.category,
        tags: data.tags,
        imageUrl: data.imageUrl,
        publishedAt: data.publishedAt,
      }
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
} 