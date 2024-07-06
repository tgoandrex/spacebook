import { revalidatePath } from "next/cache";
import prisma from "../prisma/lib/prisma";

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