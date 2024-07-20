import prisma from "../../../prisma/lib/prisma";

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    await prisma.comment.delete({
      where: {
        id: parseInt(id!)
      },
    });
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    throw new Error('Failed to delete comment');
  }
}