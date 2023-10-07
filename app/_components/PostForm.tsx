import { revalidatePath } from 'next/cache';
import prisma from "../../prisma/lib/prisma";

const PostForm = async () => {
  const createPost = async (formData: FormData) => {
    'use server'
    
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

  return (
    <form action={createPost}>
      <label htmlFor="content">Enter Post Content</label>
      <input type="text" id="content" name="content" required />
      <button type="submit" disabled>Add</button>{/* Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04) */}
    </form>
  )
}

export default PostForm;