// Components
import Post from '../../../_components/Post';
import ReportForm from '../../../_components/forms/ReportCreateForm';

// Constants (Only temporary while backend is disabled)
import { posts } from "../../../_constants";

const ReportPostPage = async (props: { params: { id: number; } }) => {
  const post = posts.find(post => post.id === Number(props.params.id));
  return (
    <main className='page-layout'>
      {post ?
        <>
          <div className="text-center pb-4">
            <span className="text-2xl">Report Post</span>
          </div>
          <div className='flex justify-center'>
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