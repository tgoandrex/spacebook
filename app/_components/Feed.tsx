import prisma from "../../prisma/lib/prisma";

// Components
import Post from "./Post";
import Photo from "./Photo";

// Constants (Only temporary while backend is disabled)
import { posts, photos, comments } from "../_constants";

const Feed = async () => {
  function shuffleArrays(array1: any[], array2: any[]): any[] {
    const combinedArray: any[] = [...array1, ...array2];
  
    for(let i = combinedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combinedArray[i], combinedArray[j]] = [combinedArray[j], combinedArray[i]];
    }
  
    return combinedArray;
  }

  const shuffledPhotosAndPosts: any[] = shuffleArrays(posts, photos);

  const itemsWithComments = shuffledPhotosAndPosts.map((item) => ({
    ...item,
    comments: comments.filter((comment) => item.commentIds.includes(comment.id))
  }));

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
    <>
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
      <ul className="flex flex-col justify-center gap-4 max-w-lg m-auto">
        {itemsWithComments.map((item) => (
          item.src ?
          <Photo 
            key={item.shuffleID} 
            id={item.id} 
            src={item.src} 
            description={item.description} 
            author={item.author} 
            likes={item.likes}
            createdAt={item.createdAt}
            content={item.content}
            comments={item.comments}
            commentsLink={true}
          />
          :
          <Post 
            key={item.shuffleID}  
            id={item.id} 
            author={item.author} 
            createdAt={item.createdAt} 
            content={item.content} 
            likes={item.likes} 
            comments={item.comments} 
            commentsLink={true}
          />
        ))}
      </ul>
    </>
  )
}

export default Feed;