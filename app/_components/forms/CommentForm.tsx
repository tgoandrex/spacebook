import { revalidatePath } from "next/cache";
import prisma from "../../../prisma/lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

// Components
import Button from '../Button';

interface CommentFormProps {
  type: string;
  id: number;
}

const CommentForm: React.FC<CommentFormProps> = async ({ type, id }) => {
  const session = await getServerSession(authOptions);

  const createComment = async (formData: FormData) => {
    "use server"

    const content = formData.get("content") as string;
    const username = session!.user.username!;
  
    switch(type) {
      case "Photo": {
        try {
          const foundPhoto = await prisma.photo.findFirst({
            where: {
              id: id
            },
            select: {
              id: true
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
            console.log('Photo not found');
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
              id: true
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
            console.log('Post not found');
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