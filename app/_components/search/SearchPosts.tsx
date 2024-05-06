/* Temporarily shut off SearchPosts until I work on this

// Components
import Post from "../Post";

// Constants (Only temporary while backend is disabled)
import { posts, comments } from "../../_constants";

const SearchPosts = async ({ query }: { query: string }) => {
  const filteredPosts = posts.filter((post) => {
    return post.content.includes(query);
  }).map((post) => ({
    ...post,
    comments: comments.filter((comment) => post.commentIds.includes(comment.id))
  }));

  return (
    <ul className="flex flex-col justify-center gap-4 max-w-lg m-auto py-8">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author}
            createdAt={new Date(post.createdAt}
            content={post.content}
            likes={post.likes}
            comments={post.comments}
            commentsLink={true}
          />
        ))
      ) : (
        <div className="text-2xl text-center">Search found no posts!</div>
      )}
    </ul>
  );
};

export default SearchPosts;

*/