import { revalidatePath } from "next/cache";
import prisma from "../prisma/lib/prisma";

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