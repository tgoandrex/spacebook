"use client"

import { useParams } from 'next/navigation';

// Components
import Post from '../../../_components/Post';
import ReportForm from '../../../_components/forms/ReportCreateForm';

// Constants (Only temporary while backend is disabled)
import { posts } from "../../../_constants";

const ReportPostPage = () => {
  const params = useParams();

  const post = posts.find(post => post.id === Number(params.id));
  return (
    <main className='page-layout'>
      {post ?
        <>
          <div className='flex justify-center flex-wrap'>
            <Post 
              key={post.id} 
              id={post.id}
              author={post.author} 
              likes={post.likes}
              createdAt={post.createdAt}
              content={post.content}
              commentsLink={false}
            />
          </div>
          <ReportForm type={"Post"} id={post.id} />
        </>
        :
        <div className='text-2xl text-center'>Post not found!</div>
      }
    </main>
  )
}

export default ReportPostPage;