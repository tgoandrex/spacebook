import prisma from "../../../prisma/lib/prisma";
import { redirect } from "next/navigation";

import { auth } from "../../../auth";

// Components
import Button from '../Button';

const PostForm = async () => {
  const session = await auth();

  const createPost = async (formData: FormData) => {
    "use server"

    const content = formData.get("content") as string;

    const user = await prisma.user.findUnique({
      where: {
        username: session?.user.username
      },
      select: {
        restricted: true
      }
    })

    if(user?.restricted) {
      throw new Error('Your account has been restricted by the administrators. Please try again in a few days.');
    }

    try {
      await prisma.post.create({
        data: {
          content: content,
          author: {
            connect: {
              username: session?.user.username
            }
          }
        }
      });
    } catch (e) {
      throw new Error('Failed to create post');
    }
    redirect(`/user/${session?.user.id}/posts`);
  };

  return (
    <div className='flex flex-col items-center gap-4'>
      <form className="flex flex-col text-center w-3/4 sm:w-1/2 m-auto" action={createPost}>
        <label htmlFor="content" className="mb-3">
          New Post<br />
          <textarea 
            id="content" 
            name="content" 
            className="border border-gray-800 rounded-lg w-full text-black" 
            rows={4} 
            maxLength={750} 
            required 
          />
        </label>
        <Button label="Add Post" isDisabled={false} />
      </form>
    </div>
  )
}

export default PostForm;