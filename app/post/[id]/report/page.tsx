import prisma from "../../../../prisma/lib/prisma";

// Components
import Post from '../../../_components/Post';
import ReportCreateForm from '../../../_components/forms/ReportCreateForm';

const ReportPostPage = async (props: { params: { id: string; } }) => {
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
      likes: true
    }
  });

  return (
    <main className='page-layout'>
      {post ?
        <>
          <div className="text-center pb-4">
            <span className="text-2xl">Report Post</span>
          </div>
          <div className='flex justify-center'>
            <Post 
              id={post.id}
              author={post.author} 
              likes={post.likes}
              createdAt={new Date(post.createdAt)}
              content={post.content}
              commentsLink={false}
            />
          </div>
          <ReportCreateForm type={"Post"} id={post.id} />
        </>
        :
        <div className='text-2xl text-center'>Post not found!</div>
      }
    </main>
  )
}

export default ReportPostPage;