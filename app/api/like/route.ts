import prisma from "../../../prisma/lib/prisma";

export async function POST(request: Request) {
    const { type, id, userId } = await request.json();

    switch(type) {
        case "Comment":
            try {
                await prisma.commentLike.create({
                    data: {
                        commentId: id,
                        userId: userId
                    }
                });
                return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
            } catch (e) {
                throw new Error('Failed to like comment');
            }
        case "Photo":
            try {
                await prisma.photoLike.create({
                    data: {
                        photoId: id,
                        userId: userId
                    }
                });
                return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
            } catch (e) {
                throw new Error('Failed to like photo');
            }
        case "Post":
            try {
                await prisma.postLike.create({
                data: {
                    postId: id,
                    userId: userId
                }
                });
                return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
            } catch (e) {
                throw new Error('Failed to like post');
            }
    }
}

export async function DELETE(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        const userId = url.searchParams.get("userId");
        const type = url.searchParams.get("type");
        
        switch(type) {
            case "Comment":
                try {                 
                    await prisma.commentLike.delete({
                    where: {
                        userId_commentId: {
                            commentId: parseInt(id!),
                            userId: parseInt(userId!)
                        }
                    }
                    });
                    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
                } catch (e) {
                    throw new Error('Failed to unlike comment');
                }
            case "Photo":
                try {
                    await prisma.photoLike.delete({
                    where: {
                        userId_photoId: {
                            photoId: parseInt(id!),
                            userId: parseInt(userId!)
                        }
                    }
                    });
                    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
                } catch (e) {
                    throw new Error('Failed to unlike photo');
                }
            case "Post":
                try {
                    await prisma.postLike.delete({
                        where: {
                            userId_postId: {
                                postId: parseInt(id!),
                                userId: parseInt(userId!)
                            }
                        }
                    });
                    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
                } catch (e) {
                    throw new Error('Failed to unlike post');
                }
        }
        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        throw new Error('Failed to unfollow');
    }
}