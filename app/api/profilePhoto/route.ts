import prisma from "../../../prisma/lib/prisma";

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
    console.error('Failed to change profile picture:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to update profile photo' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}