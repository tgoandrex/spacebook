import prisma from "../../../prisma/lib/prisma";

// Components
import CommentForm from "../../components/CommentForm";

const Post = async ({ params }: { params: { id: number } }) => {
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
    <main className='padding border border-black'>
      <h1 className="text-3xl font-bold underline">Hello, Post Dynamic Page!</h1>
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
      <CommentForm />
    </main>
  )
}

export default Post;