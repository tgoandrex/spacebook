import { revalidatePath } from 'next/cache';
import prisma from "../../prisma/lib/prisma";

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
    <form action={createComment}>
      <label htmlFor="content">Enter Comment Content</label>
      <input type="text" id="content" name="content" required />
      <button type="submit" disabled>Add</button>{/* Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04) */}
    </form>
  )
}

export default CommentForm