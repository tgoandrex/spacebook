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

export const submitLike = async (type: "Comment" | "Photo" | "Post", id: number) => {
  switch(type) {
    case "Comment":
      try {
        const foundComment = await prisma.comment.findFirst({
          where: {
            id: id
          }
        })
        
        if(foundComment) {
          await prisma.commentLike.create({
            data: {
              commentId: foundComment.id,
              userId: 1
            }
          });
        } else {
          console.log('Comment not found');
        }
      } catch (e) {
        console.log('Failed to like comment');
      }
    case "Photo":
      try {
        const foundPhoto = await prisma.photo.findFirst({
          where: {
            id: id
          }
        })
        
        if(foundPhoto) {
          await prisma.photoLike.create({
            data: {
              photoId: foundPhoto.id,
              userId: 1
            }
          });
        } else {
          console.log('Photo not found');
        }
      } catch (e) {
        console.log('Failed to like photo');
      }
    case "Post":
      try {
        const foundPost = await prisma.post.findFirst({
          where: {
            id: id
          }
        })
        
        if(foundPost) {
          await prisma.postLike.create({
            data: {
              postId: foundPost.id,
              userId: 1
            }
          });
        } else {
          console.log('Post not found');
        }
      } catch (e) {
        console.log('Failed to like post');
      }
  }
}

export const createReport = async (formData: FormData) => {
  const reportType = formData.get("reportType") as string;
  const reportMessage = formData.get("message") as string;
  const entityType = formData.get("entityType") as string;
  const entityId = Number(formData.get("entityId"));

  switch(entityType) {
    case "Comment":
      try {
        const foundComment = await prisma.comment.findFirst({
          where: {
            id: entityId
          }
        });

        if(foundComment) {
          await prisma.report.create({
            data: {
              type: reportType,
              reporterMessage: reportMessage,
              reporterUsername: "tgoandrex",
              commentId: foundComment.id
            }
          });
        } else {
          console.log('Comment not found');
        }
      } catch (e) {
        console.log('Failed to fetch comment');
      }
    case "Photo":
      try {
        const foundPhoto = await prisma.photo.findFirst({
          where: {
            id: entityId
          }
        });

        if(foundPhoto) {
          await prisma.report.create({
            data: {
              type: reportType,
              reporterMessage: reportMessage,
              reporterUsername: "tgoandrex",
              photoId: foundPhoto.id
            }
          });
        } else {
          console.log('Photo not found');
        }
      } catch (e) {
        console.log('Failed to fetch photo');
      }
    case "Post":
      try {
        const foundPost = await prisma.post.findFirst({
          where: {
            id: entityId
          }
        });

        if(foundPost) {
          await prisma.report.create({
            data: {
              type: reportType,
              reporterMessage: reportMessage,
              reporterUsername: "tgoandrex",
              postId: foundPost.id
            }
          });
        } else {
          console.log('Post not found');
        }
      } catch (e) {
        console.log('Failed to fetch post');
      }
  }
}

export const resolveReport = async (formData: FormData) => {
  const id = Number(formData.get("reportId"));
  const message = formData.get("message") as string;

  try {
    await prisma.report.update({
      where: {
        id: id
      },
      data: {
        resolved: true,
        adminAction: message
      }
    })
    revalidatePath('/');
  } catch (e) {
    console.log('Failed to resolve report');
  }
}