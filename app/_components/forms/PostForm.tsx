import { revalidatePath } from 'next/cache';
import prisma from "../../../prisma/lib/prisma";

// Components
import Button from '../Button';

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
    <form action={createPost} className="flex flex-col text-center w-3/4 sm:w-1/2 m-auto">
      <label htmlFor="content" className="mb-3">
        Enter Post Content<br />
        <textarea id="content" name="content" className="border border-gray-800 rounded-lg w-full  text-black" rows={4} required />
      </label>
    <Button label="Add Post" isDisabled={true} /> {/* Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04) */}
  </form>
  )
}

export default PostForm;