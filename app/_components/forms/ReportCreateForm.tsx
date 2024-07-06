import prisma from "../../../prisma/lib/prisma";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

// Components
import Button from '../Button';

interface ReportFormProps {
  type: string;
  id: number;
}

const ReportCreateForm: React.FC<ReportFormProps> = async ({ type, id }) => {
  const session = await getServerSession(authOptions);

  const createReport = async (formData: FormData) => {
    "use server"

    const reportType = formData.get("reportType") as string;
    const reportMessage = formData.get("message") as string;
    const entityType = type;
    const entityId = id;

    const username = session!.user.username;
  
    switch(entityType) {
      case "Comment":
        try {
          const foundComment = await prisma.comment.findFirst({
            where: {
              id: entityId
            }
          });
  
          if(foundComment) {
            await prisma.report.create({
              data: {
                type: reportType,
                reporterMessage: reportMessage,
                reporterUsername: username,
                commentId: foundComment.id
              }
            });
          } else {
            console.log('Comment not found');
          }
        } catch (e) {
          throw new Error('Failed to fetch comment');
        }
      case "Photo":
        try {
          const foundPhoto = await prisma.photo.findFirst({
            where: {
              id: entityId
            }
          });
  
          if(foundPhoto) {
            await prisma.report.create({
              data: {
                type: reportType,
                reporterMessage: reportMessage,
                reporterUsername: username,
                photoId: foundPhoto.id
              }
            });
          } else {
            console.log('Photo not found');
          }
        } catch (e) {
          throw new Error('Failed to fetch photo');
        }
      case "Post":
        try {
          const foundPost = await prisma.post.findFirst({
            where: {
              id: entityId
            }
          });
  
          if(foundPost) {
            await prisma.report.create({
              data: {
                type: reportType,
                reporterMessage: reportMessage,
                reporterUsername: username,
                postId: foundPost.id
              }
            });
          } else {
            console.log('Post not found');
          }
        } catch (e) {
          throw new Error('Failed to fetch post');
        }
      redirect('/');
    }
  }

  return (
    <form className="flex flex-col text-center w-3/4 sm:w-1/2 m-auto mt-4" action={createReport}>
      <span className='my-4'>Please do not abuse the report function. Repeated misuse will result in action against the reporter.</span>
      <div className="flex justify-center">
        <label htmlFor="inappropriateContent" className="mr-4">
          <input 
            type="radio" 
            id="inappropriateContent" 
            name="reportType" 
            value="inappropriateContent"
            required
          />
          Inappropriate Content
        </label>
        <label htmlFor="threatsOrViolence" className="mr-4">
          <input 
            type="radio" 
            id="threatsOrViolence" 
            name="reportType" 
            value="threatsOrViolence"
          />
          Threats or Violence
        </label>
        <label htmlFor="other">
          <input 
            type="radio" 
            id="other" 
            name="reportType" 
            value="Other"
          />
          Other
        </label>
      </div>
      <label htmlFor="message" className="mb-3">
        Explain briefly why this should be reported
        <textarea 
          id="message" 
          name="message" 
          className="border border-gray-800 rounded-lg w-full text-black" 
          rows={4} 
          maxLength={300} 
          required 
        />
      </label>
      <Button label="Submit" isDisabled={false} />
    </form>
  )
}

export default ReportCreateForm;