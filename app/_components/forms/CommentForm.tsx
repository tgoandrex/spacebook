import { revalidatePath } from "next/cache";
import prisma from "../../../prisma/lib/prisma";

import { auth } from "../../../auth";

// Components
import Button from '../Button';

interface CommentFormProps {
  type: string;
  id: number;
}

const CommentForm: React.FC<CommentFormProps> = async ({ type, id }) => {
  const session = await auth();

  const createComment = async (formData: FormData) => {
    "use server"

    const content = formData.get("content") as string;
    const username = session!.user.username!;

    const user = await prisma.user.findUnique({
      where: {
        username: username
      },
      select: {
        username: true,
        restricted: true
      }
    })

    if(user?.restricted) {
      throw new Error('Your account has been restricted by the administrators. Please try again in a few days.');
    }
  
    switch(type) {
      case "Photo": {
        try {
          const foundPhoto = await prisma.photo.findFirst({
            where: {
              id: id
            },
            select: {
              id: true,
              content: true,
              author: {
                select: {
                  username: true
                }
              }
            }
          });

          if(foundPhoto) {
            await prisma.comment.create({
              data: {
                content: content,
                authorUsername: username,
                photoId: foundPhoto.id
              }
            });
          } else {
            throw new Error('Photo not found');
          }

          const ExistingNotificationForPhoto = await prisma.notification.findFirst({
            where: {
              photoId: foundPhoto.id
            },
            select: {
              id: true
            }
          });

          if(!ExistingNotificationForPhoto && foundPhoto?.author.username !== user?.username) {
            await prisma.notification.create({
              data: {
                content: `New comment(s) on your photo: ${foundPhoto?.content.substring(0, 50)}`,
                userUsername: foundPhoto.author.username,
                photoId: foundPhoto?.id
              }
            });
          }
        } catch (e) {
          throw new Error('Failed to fetch photo');
        }
        break;
      }
      case "Post": {
        try {
          const foundPost = await prisma.post.findFirst({
            where: {
              id: id
            },
            select: {
              id: true,
              content: true,
              author: {
                select: {
                  username: true
                }
              }
            }
          });

          if(foundPost) {
            await prisma.comment.create({
              data: {
                content: content,
                authorUsername: username,
                postId: foundPost.id
              }
            });
          } else {
            throw new Error('Post not found');
          }

          const ExistingNotificationForPost = await prisma.notification.findFirst({
            where: {
              postId: foundPost.id
            },
            select: {
              id: true
            }
          });

          if(!ExistingNotificationForPost && foundPost?.author.username !== user?.username) {
            await prisma.notification.create({
              data: {
                content: `New comments on your post: ${foundPost?.content}`,
                userUsername: foundPost.author.username,
                postId: foundPost?.id
              }
            });
          }
        } catch (e) {
          throw new Error('Failed to fetch post');
        }
        break;
      }
    }
    revalidatePath('/');
  }

  return (
    <form action={createComment} className="flex flex-col text-center w-3/4 sm:w-1/2 m-auto mt-4">
      <label htmlFor="content" className="mb-3">
        New Comment<br />
        <textarea id="content" name="content" className="border border-gray-800 rounded-lg w-full text-black" rows={4} required />
      </label>
      <Button label="Add Comment" isDisabled={false} />
    </form>
  )
}

export default CommentForm;