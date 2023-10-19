import prisma from "../../prisma/lib/prisma";
import { revalidatePath } from 'next/cache';

export async function getFeedPosts() {
  const data = await prisma.post.findMany({
    where: {
      // However we find the authorized user's followed user(s) posts!
    },
    include: {
      author: {
        select: { id: true }
      }
    }
  });

  return data;
}

export async function getSpecificPost(postId: number) {
  const data = await prisma.post.findUnique({
    where: {
      id: postId
    },
    include: {
      author: {
        select: { id: true }
      }
    }
  });

  return data;
}

export async function getCommentsFromPost(postId: number) {
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId
    },
    include: {
      author: {
        select: { id: true }
      }
    }
  });

  return comments;
}

export async function createPost(formData: FormData) {
  "use server"
  
  const value = formData.get("content") as string;

  try {
    await prisma.post.create({
      data: {
        content: value,
        authorEmail: 'tgoandrex@gmail.com'
      }
    });

    revalidatePath('/');
  } catch (e) {
    console.log('Failed to create post');
  }
}