import { revalidatePath } from "next/cache";
import prisma from "../prisma/lib/prisma";

export const createPost = async (formData: FormData) => {  
  const value = formData.get("content") as string;

  try {
    await prisma.post.create({
      data: {
        content: value,
        authorUsername: 'tgoandrex'
      }
    });

    revalidatePath('/');
  } catch (e) {
    console.log('Failed to create post');
  }
}

export const createComment = async (formData: FormData) => {
  const value = formData.get("content") as string;

  try {
    await prisma.comment.create({
      data: {
        content: value,
        postId: 1,
        authorUsername: "tgoandrex"
      }
    });

    revalidatePath('/');
  } catch (e) {
    console.log('Failed to create comment');
  }
} 

export const submitLike = async (type: "Comment" | "Photo" | "Post", id: number) => {
  switch(type) {
    case "Comment":
      try {
        await prisma.comment.findFirst({
          where: {
            id: id
          }
        })
  
        revalidatePath('/');
      } catch (e) {
        console.log('Failed to like comment');
      }
    case "Photo":
      /* TODO: Create Photo table in Prisma
        try {
          await prisma.photo.findFirst({
            where: {
              id: id
            }
          })
    
          revalidatePath('/');
        } catch (e) {
          console.log('Failed to like photo');
        }
      */
    case "Post":
      try {
        await prisma.post.findFirst({
          where: {
            id: id
          }
        })
  
        revalidatePath('/');
      } catch (e) {
        console.log('Failed to like post');
      }
  }
}

export const submitFollow = async (followerId: number, followingId: number) => {
  try {
    const userToFollow = await prisma.user.findFirst({
      where: {
        id: followerId
      }
    })

    const userFollowing = await prisma.user.findFirst({
      where: {
        id: followingId
      }
    })

    
    await prisma.follow.create({
      data: {
        followerId: userToFollow!.id,
        followingId: userFollowing!.id
      }
    })

    revalidatePath('/');
  } catch (e) {
    console.log('Failed to follow user');
  }
}