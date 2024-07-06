'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../api/uploadthing/core";

const PostPhoto = () => {
  const { data: session } = useSession();
  
  const router = useRouter();

  const createPhoto = async (id: number, content: string, url: string) => {
    await fetch(`/api/photo`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        content: content,
        url: url
      }),
    }).then((res) => {
      return res.json();
    }).then((data) => {
      console.log(data);
    }).catch((e: Error) => {
      console.log("response error: ", e);
    });
  };

  return (
    <div className='flex flex-col items-center'>
      New Photo
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          let content = prompt("Please enter a brief description for this photo");
          if(content) {
            createPhoto(Number(session!.user.id), content, res![0].url);
            router.push(`/user/${session?.user.id}/photos`);
          } else {
            throw new Error('Photo did not upload, please enter a description when prompted');
          }
        }}
        onUploadError={(error: Error) => {
          throw new Error('Photo did not upload, please enter a description when prompted');
        }}
      />
    </div>
  )
}

export default PostPhoto;