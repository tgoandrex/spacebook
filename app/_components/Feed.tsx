import prisma from "../../prisma/lib/prisma";

// Components
import Post from "./Post";

// Constants (Only temporary while backend is disabled)
import { posts } from "../_constants";

const Feed = async () => {
  /* Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04)
  const data = await prisma.post.findMany({
    where: {
      // However we find the authorized user's followed user(s) posts!
    },
    include: {
      author: {
        select: { id: true }
      }
    }
  });
  */
  return (
    <section>
      {/* Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04)
        data.length > 0 ? 
          <ul>
            {data.map((post) => (
              <li key={post.id}>
                <span>{post.id}</span>
                <span>{post.content}</span>
                <span>{post.authorEmail}</span>
                <span>{post.author.id}</span>
              </li>
            ))}
          </ul> :
        <p>No posts yet! Create a post!</p>
      */}
      <ul className="flex flex-col justify-center gap-4 max-w-lg m-auto py-8">
        {posts.map((post) => (
          <Post key={post.id} id={post.id} authorEmail={post.authorEmail} createdAt={post.createdAt} content={post.content} likes={post.likes} comments={post.comments} />
        ))}
      </ul>
    </section>
  )
}

export default Feed;