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

    if (!user) {
      return new Response(JSON.stringify({ success: false, error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ success: true, user }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Failed to get user:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to get user' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
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
    console.error('Failed to update profile picture:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to update profile photo' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}