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

export const deletePost = async (postId: number) => {
  try {
    await prisma.post.delete({
      where: {
        id: postId
      }
    });

    revalidatePath('/');
  } catch (e) {
    console.log('Failed to delete post');
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

export const deleteComment = async (commentId: number) => {  
  try {
    await prisma.comment.delete({
      where: {
        id: commentId
      }
    });

    revalidatePath('/');
  } catch (e) {
    console.log('Failed to delete comment');
  }
}

export const createPhoto = async (formData: FormData) => {
  const value = formData.get("content") as string;

  try {
    await prisma.photo.create({
      data: {
        url: "PLACEHOLDER",
        content: value,
        authorUsername: "tgoandrex"
      }
    });

    revalidatePath('/');
  } catch (e) {
    console.log('Failed to create photo');
  }
}

export const deletePhoto = async (photoId: number) => {  
  try {
    await prisma.photo.delete({
      where: {
        id: photoId
      }
    });

    revalidatePath('/');
  } catch (e) {
    console.log('Failed to delete photo');
  }
}

export const report = async (formData: FormData) => {
  const reportType = formData.get("reportType") as string;
  const message = formData.get("message") as string;

  try {
    await prisma.photo.create({
      data: {
        url: "PLACEHOLDER",
        content: message,
        authorUsername: "tgoandrex"
      }
    });

    revalidatePath('/');
  } catch (e) {
    console.log('Failed to create report');
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