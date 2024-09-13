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
          username: true
        }
      })
  
      if (!user) {
        return new Response(JSON.stringify({ success: false, error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      }
      
      const notifications = await prisma.notification.findMany({
        where: {
          userUsername: user.username
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
  
      if (!notifications) {
        return new Response(JSON.stringify({ success: false, error: 'Notifications not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      }
  
      return new Response(JSON.stringify({ success: true, notifications }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
      console.error('Failed to get notifications:', error);
      return new Response(JSON.stringify({ success: false, error: 'Failed to get notifications' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }

  export async function DELETE(request: Request) {
    try {
      const url = new URL(request.url);
      const id = url.searchParams.get("id");
  
      await prisma.notification.delete({
        where: {
          id: parseInt(id!)
        },
      });
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
      throw new Error('Failed to delete notification');
    }
  }