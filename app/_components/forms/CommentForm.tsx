import { revalidatePath } from 'next/cache';
import prisma from "../../../prisma/lib/prisma";

// Components
import Button from '../Button';

const CommentForm = async () => {
  const createComment = async (formData: FormData) => {
    'use server'
    
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

  return (
    <form action={createComment} className="flex flex-col text-center w-1/2 m-auto">
      <label htmlFor="content" className="mb-3">
        Enter Comment Content<br />
        <textarea id="content" name="content" className="border border-gray-800" required />
      </label>
      <Button label="Add Comment" isDisabled={true} /> {/* Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04) */}
    </form>
  )
}

export default CommentForm