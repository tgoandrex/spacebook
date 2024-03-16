"use client"

import { useParams } from 'next/navigation';

// Components
import Comment from '../../../_components/Comment';
import ReportForm from "../../../_components/forms/ReportCreateForm";

// Constants (Only temporary while backend is disabled)
import { comments } from "../../../_constants";

const ReportCommentPage = () => {
  const params = useParams();

  const comment = comments.find(comment => comment.id === Number(params.id));

  return (
    <main className='page-layout'>
      {comment ?
        <>
          <div className='flex justify-center flex-wrap'>
            <div className='px-2 py-2 bg-white dark:bg-slate-700 rounded-lg shadow-lg dark:shadow-none'>
              <Comment 
                key={comment.id} 
                id={comment.id}
                author={comment.author} 
                likes={comment.likes}
                createdAt={comment.createdAt}
                content={comment.content}
              />
            </div>
          </div>
          <ReportForm type={"Comment"} id={comment.id} />
        </>
        :
        <div className='text-2xl text-center'>Comment not found!</div>
      }
    </main>
  )
}

export default ReportCommentPage;