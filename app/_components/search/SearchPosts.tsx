import prisma from "../../../prisma/lib/prisma";

// Components
import Post from "../Post";

const SearchPosts = async({ query, page, pageSize } : { query: string, page: number, pageSize: number;  }) => {
  const offset = (page - 1) * pageSize;

  const filteredPosts = await prisma.post.findMany({
    where: {
      content: {
        contains: query,
        mode: 'insensitive'
      }
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
    },
    orderBy: {
      createdAt: 'desc'
    },
    skip: offset,
    take: pageSize
  });

  return (
    filteredPosts.length > 0 ?
      <ul className="flex flex-col justify-center gap-4 max-w-lg m-auto py-8">
        {filteredPosts.map((post) => (
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
    :
      <div className="text-2xl text-center">Search found no posts!</div>
  );
};

export default SearchPosts;