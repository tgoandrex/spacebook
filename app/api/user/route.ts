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
        id: true,
        username: true,
        fname: true,
        lname: true,
        role: true,
        profilePhoto: true,
        createdAt: true
      }
    });

    if(user) {
      const followers = await prisma.follow.findMany({
        where: {
          followingId: user.id
        },
        select: {
          followerId: true
        }
      })

      const formattedFollowers = followers.map(follower => ({ id: follower.followerId }));
      
      return new Response(JSON.stringify({ success: true, user, formattedFollowers }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ success: false, error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    throw new Error('Failed to get user');
  }
}

export async function POST(request: Request) {
  try {
    const { id, url } = await request.json();
    await prisma.user.update({
      where: {
        id: id
      },
      data: {
        profilePhoto: url
      }
    });
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    throw new Error('Failed to update profile photo');
  }
}