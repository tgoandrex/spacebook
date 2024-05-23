'use client'

import { useState } from 'react';
import { useSession } from "next-auth/react";

// Components
import Button from '../Button';

const PostForm = () => {
  const { data: session } = useSession();

  const [showForm, setShowForm] = useState(false);

  const createPost = async (formData: FormData) => {  
    const content = formData.get("content") as string;

    await fetch(`/api/post`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: session?.user.username,
        content: content
      }),
    }).then((res) => {
      return res.json();
    }).then((data) => {
      console.log(data);
      setShowForm(false);
    }).catch((e: Error) => {
      console.log("response error: ", e);
    });
  };

  return (
    <div className='flex flex-col items-center gap-4'>
      <Button 
        label={showForm ? "Cancel" : "Add New Post"} 
        clickEvent={() => setShowForm(!showForm)} 
        isDisabled={false} 
      />
      {showForm &&
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
      }
    </div>
  )
}

export default PostForm;