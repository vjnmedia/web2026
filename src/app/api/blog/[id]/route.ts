import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single blog post
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        id: parseInt(params.id)
      }
    });

    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
}

// PUT update blog post
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const post = await prisma.blogPost.update({
      where: {
        id: parseInt(params.id)
      },
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        status: data.status,
        category: data.category,
        tags: data.tags,
        imageUrl: data.imageUrl,
        publishedAt: data.publishedAt,
        updatedAt: new Date()
      }
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

// DELETE blog post
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.blogPost.delete({
      where: {
        id: parseInt(params.id)
      }
    });
    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
} 