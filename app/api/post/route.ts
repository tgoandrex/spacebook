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
    
    const posts = await prisma.post.findMany({
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (!posts) {
      return new Response(JSON.stringify({ success: false, error: 'Posts not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ success: true, posts }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Failed to get user:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to get posts' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    await prisma.post.delete({
      where: {
        id: parseInt(id!)
      },
    });
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    throw new Error('Failed to delete post');
  }
}