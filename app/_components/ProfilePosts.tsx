// Components
import Post from "./Post";

// Constants (Only temporary while backend is disabled)
import { posts } from "../_constants";


const ProfilePosts = () => {
  return (
    <ul className="flex flex-col justify-center gap-4 max-w-lg m-auto py-8">
      {posts.map((post) => (
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