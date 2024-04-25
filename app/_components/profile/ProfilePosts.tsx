// Components
import Post from "../Post";

// Constants (Only temporary while backend is disabled)
import { posts, comments } from "../../_constants";


const ProfilePosts = async () => {
  const postsWithComments = posts.map((post) => ({
    ...post,
    comments: comments.filter((comment) => post.commentIds.includes(comment.id))
  }));

  return (
    <ul className="flex flex-col justify-center gap-4 max-w-lg m-auto py-8">
      {postsWithComments.map((post) => (
        <Post 
          key={post.id}  
          id={post.id} 
          author={post.author} 
          createdAt={post.createdAt} 
          content={post.content} 
          likes={post.likes} 
          comments={post.comments} 
          commentsLink={true}
        />
      ))}
    </ul>
  )
}

export default ProfilePosts;