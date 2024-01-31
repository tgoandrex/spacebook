import { revalidatePath } from "next/cache";
import prisma from "../prisma/lib/prisma";

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

export const createComment = async (formData: FormData) => {
  const value = formData.get("content") as string;

  try {
    await prisma.comment.create({
      data: {
        content: value,
        postId: 1,
        authorEmail: "tgoandrex@gmail.com"
      }
    });

    revalidatePath('/');
  } catch (e) {
    console.log('Failed to create comment');
  }
}