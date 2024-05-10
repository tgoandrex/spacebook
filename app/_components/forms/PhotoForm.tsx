'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../api/uploadthing/core";

// Components
import Button from '../Button';

const PostPhoto = () => {
  const { data: session } = useSession();

  const [showUploadButton, setShowUploadButton] = useState(false);

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
    <div className='flex flex-col items-center gap-4 pt-4'>
      <Button 
        label={showUploadButton ? "Cancel" : "Add New Photo"} 
        clickEvent={() => setShowUploadButton(!showUploadButton)} 
        isDisabled={false} 
      />
      {showUploadButton &&
        <UploadButton<OurFileRouter>
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            let content = prompt("Please enter a brief description for this photo");
            if(content) {
              createPhoto(Number(session!.user.id), content, res![0].url);
              alert("Photo upload Completed");
            } else {
              alert("Photo did not upload, please enter a description next time");
            }
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      }
    </div>
  )
}

export default PostPhoto;