import prisma from "../../../prisma/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id!)
      },
      select: {
        id: true
      }
    });

    if (!user) {
      return new Response(JSON.stringify({ success: false, error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    const followers = await prisma.follow.findMany({
      where: {
        followingId: user.id
      },
      include: {
        follower: {
          select: {
            id: true,
            username: true,
            profilePhoto: true
          }
        }
      }
    })

    if (!followers) {
      return new Response(JSON.stringify({ success: false, error: 'Followers not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    const flattenedFollowers = followers.map(f => ({
      id: f.follower.id,
      username: f.follower.username,
      profilePhoto: f.follower.profilePhoto
    }));

    return new Response(JSON.stringify({ success: true, followers: flattenedFollowers }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    throw new Error('Failed to get followers');
  }
}

export async function POST(request: Request) {
  try {
    const { followerId, followingId } = await request.json();
    await prisma.follow.create({
      data: {
        followerId: followerId,
        followingId: followingId
      }
    });
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    throw new Error('Failed to create follow');
  }
}