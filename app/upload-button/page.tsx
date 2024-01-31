"use client";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core";

const UploadButtonPage = () => {
  return (
    <div>Temporary content!</div>
    /*
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
    </main>
    */
  )
}

export default UploadButtonPage;