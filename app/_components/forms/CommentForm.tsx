import { revalidatePath } from "next/cache";
import prisma from "../../../prisma/lib/prisma";

// Components
import Button from '../Button';

interface CommentFormProps {
  type: string;
  id: number;
}

const CommentForm: React.FC<CommentFormProps> = async ({ type, id }) => {
  const createComment = async (formData: FormData) => {
    "use server"

    const content = formData.get("content") as string;
  
    switch(type) {
      case "Photo":
        try {
          const foundPhoto = await prisma.photo.findFirst({
            where: {
              id: id
            }
          });
  
          if(foundPhoto) {
            await prisma.comment.create({
              data: {
                content: content,
                authorUsername: "tgoandrex",
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
              id: id
            }
          });
  
          if(foundPost) {
            await prisma.comment.create({
              data: {
                content: content,
                authorUsername: "tgoandrex",
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