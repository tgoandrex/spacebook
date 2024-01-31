'use client'

import prisma from "../../../prisma/lib/prisma";
import { useParams } from 'next/navigation';

// Components
import Post from "../../_components/Post";
import CommentForm from "../../_components/forms/CommentForm";

// Constants (Only temporary while backend is disabled)
import { posts } from "../../_constants";

// const PostPage = async ({ params }: { params: { id: number } }) => { (Should use once backend is enabled again)
const PostPage = () => {
  const params = useParams();

  const post = posts.find(post => post.id === Number(params.id));
  /* Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04)
  await prisma.post.findUnique({
    where: {
      id: params.id
    },
    include: {
      author: {
        select: { id: true }
      }
    }
  });

  const comments = await prisma.comment.findMany({
    where: {
      postId: params.id
    },
    include: {
      author: {
        select: { id: true }
      }
    }
  });
  */
  return (
    <main className='page-layout'>
      {/* Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04)
        <ul>
          <li key={post.id}>
            <span>{post.id}</span>
            <span>{post.content}</span>
            <span>{post.authorEmail}</span>
            <span>{post.author.id}</span>
          </li>
        </ul>
        comments.length > 0 ? 
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <span>{comment.id}</span>
              <span>{comment.content}</span>
              <span>{comment.authorEmail}</span>
              <span>{comment.author.id}</span>
            </li>
          ))}
        </ul> :
        <p>No comments yet! Create a comment!</p>
      */}
      {post ?
        <>
          <div className="gap-4 max-w-lg m-auto">
            <Post 
              key={post.id} 
              id={post.author.id}
              author={post.author} 
              likes={post.likes}
              createdAt={post.createdAt}
              content={post.content}
              comments={post.comments}
              commentsLink={false}
            />
          </div>
        </>
        :
        <div className='text-2xl text-center'>Photo not found!</div>
      }
      <CommentForm />
    </main>
  )
}

export default PostPage;