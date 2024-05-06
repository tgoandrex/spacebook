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

export async function POST(request: Request) {
  try {
    const { username, content } = await request.json();

    await prisma.post.create({
      data: {
        content: content,
        author: {
          connect: {
            username: username
          }
        }
      }
    });
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Failed to create post:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to create post' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}