import prisma from "../../../prisma/lib/prisma";

// Components
import Post from "../../_components/Post";
import CommentForm from "../../_components/forms/CommentForm";

const PostPage = async (props: { params: { id: string; } }) => {
  const post = await prisma.post.findUnique({
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
      likes: true,
      comments: {
        include: {
          author: {
            select: {
              id: true,
              username: true
            }
          },
          likes: true
        }
      }
    }
  });

  return (
    <main className='page-layout'>
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
          <CommentForm type={"Post"} id={post.id} />
        </>
        :
        <div className='text-2xl text-center'>Post not found!</div>
      }
    </main>
  )
}

export default PostPage;