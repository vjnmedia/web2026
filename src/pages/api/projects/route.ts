import { NextRequest, NextResponse } from 'next/server';

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    name: 'Youth Education Initiative',
    status: 'Active',
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    description: 'Comprehensive education program for youth development',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500',
    externalLink: 'https://example.com/education-initiative'
  },
  {
    id: 2,
    name: 'Peace Building Program',
    status: 'Active',
    startDate: '2024-02-01',
    endDate: '2024-11-30',
    description: 'Community peace building and conflict resolution program',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500',
    externalLink: 'https://example.com/peace-building'
  },
  {
    id: 3,
    name: 'Economic Empowerment',
    status: 'Planned',
    startDate: '2024-06-01',
    endDate: '2025-05-31',
    description: 'Skills training and economic development for communities',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500',
    externalLink: 'https://example.com/economic-empowerment'
  }
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(mockProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newProject = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updatedProject = {
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}


