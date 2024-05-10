import prisma from "../../../prisma/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    const author = await prisma.user.findUnique({
      where: {
        id: parseInt(id!)
      },
      select: {
        username: true
      }
    })

    if (!author) {
      return new Response(JSON.stringify({ success: false, error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    
    const photos = await prisma.photo.findMany({
      where: {
        authorUsername: author.username
      },
      include: {
        author: {
          select: {
            id: true,
            username: true
          }
        },
        likes: true,
        comments: {
          include: {
            author: {
              select: {
                id: true,
                username: true
              }
            },
            likes: true
          }
        }
      }
    })

    if (!photos) {
      return new Response(JSON.stringify({ success: false, error: 'Photos not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ success: true, photos }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Failed to get photos:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to get photos' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function POST(request: Request) {
  try {
    const { id, url, content } = await request.json();

    const author = await prisma.user.findUnique({
      where: {
        id: parseInt(id!)
      },
      select: {
        username: true
      }
    })

    if (!author) {
      return new Response(JSON.stringify({ success: false, error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    await prisma.photo.create({
      data: {
        authorUsername: author.username,
        url: url,
        content: content
      }
    });
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Failed to update profile picture:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to update profile photo' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}