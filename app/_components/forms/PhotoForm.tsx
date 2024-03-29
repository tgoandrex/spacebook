'use client'

import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../api/uploadthing/core";

// Components
import Button from '../Button';

const PostPhoto = () => {
  const [showUploadButton, setShowUploadButton] = useState(false);

  return (
    <div className='flex flex-col items-center gap-4 pt-4'>
      <Button 
        label={showUploadButton ? "Cancel" : "Add New Photo"} 
        clickEvent={() => setShowUploadButton(!showUploadButton)} 
        isDisabled={true} 
      />
      {showUploadButton &&
        <UploadButton<OurFileRouter>
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      }
    </div>
  )
}

export default PostPhoto;