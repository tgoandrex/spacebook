import { revalidatePath } from "next/cache";
import prisma from "../prisma/lib/prisma";

export const submitLike = async (type: "Post" | "Comment", id: number) => {
  if(type === "Comment") {
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
  } else {
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