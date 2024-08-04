import prisma from "../../../prisma/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const offset = url.searchParams.get("offset");
    const limit = url.searchParams.get("limit");

    const author = await prisma.user.findUnique({
      where: {
        id: parseInt(id!)
      },
      select: {
        id: true
      }
    })

    if (!author) {
      return new Response(JSON.stringify({ success: false, error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    
    const followingPostsAndPhotos = await prisma.follow.findMany({
      where: {
        followerId: Number(author.id)
      },
      select: {
        following: {
          select: {
            posts: {
              include: {
                likes: true,
                author: {
                  select: {
                    id: true,
                    username: true
                  }
                },
                comments: {
                  include: {
                    likes: true,
                    author: {
                      select: {
                        id: true,
                        username: true
                      }
                    }
                  }
                }
              }
            },
            photos: {
              include: {
                likes: true,
                author: {
                  select: {
                    id: true,
                    username: true
                  }
                },
                comments: {
                  include: {
                    likes: true,
                    author: {
                      select: {
                        id: true,
                        username: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!followingPostsAndPhotos) {
      return new Response(JSON.stringify({ success: false, error: 'Feed not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    const mergedItems = followingPostsAndPhotos.flatMap((follow) => {
      return [...follow.following.posts, ...follow.following.photos];
    });
  
    const sortedItems = mergedItems.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const paginatedItems = sortedItems.slice(Number(offset), Number(offset) + Number(limit));

    return new Response(JSON.stringify({ success: true, paginatedItems }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Failed to get user:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to get feed' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}