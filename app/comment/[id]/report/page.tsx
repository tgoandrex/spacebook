import { auth } from "../../../../auth";
import { redirect } from "next/navigation";


import prisma from "../../../../prisma/lib/prisma";

// Components
import Comment from '../../../_components/Comment';
import ReportCreateForm from "../../../_components/forms/ReportCreateForm";

const ReportCommentPage = async (props: { params: { id: string; } }) => {

  const session = await auth();

  if(!session?.user) {
    redirect("/");
  }

  const comment = await prisma.comment.findUnique({
    where: {
      id: parseInt(props.params.id)
    },
    include: {
      author: {
        select: {
          id: true,
          username: true
        }
      },
      likes: true
    }
  });

  return (
    <main className='page-layout'>
      {comment ?
        <>
          <div className="text-center pb-4">
            <span className="text-2xl">Report Comment</span>
          </div>
          <div className='flex justify-center'>
            <div className='px-2 py-2 bg-white dark:bg-slate-700 rounded-lg shadow-lg dark:shadow-none'>
              <Comment 
                id={comment.id}
                author={comment.author} 
                likes={comment.likes}
                createdAt={comment.createdAt}
                content={comment.content}
              />
            </div>
          </div>
          <ReportCreateForm type={"Comment"} id={comment.id} />
        </>
        :
        <div className='text-2xl text-center'>Comment not found!</div>
      }
    </main>
  )
}

export default ReportCommentPage;