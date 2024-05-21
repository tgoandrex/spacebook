import prisma from "../../prisma/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

// Components
import Post from "./Post";
import Photo from "./Photo";

interface Follow {
  following: {
    posts: Post[];
    photos: Photo[];
  };
}

interface Post {
  id: number;
  content: string;
  author: {
    id: number;
    username: string;
  };
  likes: { userId: number; postId: number; createdAt: Date; }[];
  comments?: Comment[];
  createdAt: Date;
}

interface Photo {
  id: number;
  url: string;
  content: string;
  author: {
    id: number;
    username: string;
  };
  likes: { userId: number; photoId: number; createdAt: Date; }[];
  comments?: Comment[];
  createdAt: Date;
}

interface Comment {
  id: number,
  author: {id: number, username: string};
  authorUsername: string;
  createdAt: Date;
  content: string;
  postId: number | null;
  photoId: number | null;
  likes: { userId: number; commentId: number; createdAt: Date; }[];
};

const Feed = async () => {
  const session = await getServerSession(authOptions);

  const followingPostsAndPhotos = await prisma.follow.findMany({
    where: {
      followerId: Number(session?.user.id)
    },
    select: {
      following: {
        select: {
          posts: {
            include: {
              likes: true,
              author: {
                select: {
                  id: true,
                  username: true
                }
              },
              comments: {
                include: {
                  likes: true,
                  author: {
                    select: {
                      id: true,
                      username: true
                    }
                  }
                }
              }
            }
          },
          photos: {
            include: {
              likes: true,
              author: {
                select: {
                  id: true,
                  username: true
                }
              },
              comments: {
                include: {
                  likes: true,
                  author: {
                    select: {
                      id: true,
                      username: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  const mergedItems = followingPostsAndPhotos.flatMap((follow: Follow) => {
    return [...follow.following.posts, ...follow.following.photos];
  });

  const sortedItems = mergedItems.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <ul className="flex flex-col justify-center gap-4 max-w-lg m-auto">
      {sortedItems.length > 0 ?
        sortedItems.map((item: Post | Photo) => (
          'url' in item ? (
            <Photo 
              key={item.id} 
              id={item.id} 
              url={item.url} 
              content={item.content} 
              author={{ id: item.author.id, username: item.author.username }} 
              createdAt={item.createdAt}
              likes={item.likes}
              comments={item.comments}
              commentsLink={true}
            />
          ) : (
            <Post 
              key={item.id}  
              id={item.id} 
              content={item.content} 
              author={{ id: item.author.id, username: item.author.username }} 
              createdAt={item.createdAt}
              likes={item.likes}
              comments={item.comments}
              commentsLink={true}
            />
          )
        ))
      :
        <li className='text-2xl text-center'>Feed not found!</li>
      }
    </ul>
  )
}

export default Feed;