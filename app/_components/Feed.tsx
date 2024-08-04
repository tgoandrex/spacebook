"use client"

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

// Components
import Post from "./Post";
import Photo from "./Photo";
import Button from "./Button";

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

const Feed = () => {
  const { data: session } = useSession();

  const INITIAL_NUMBER_OF_FEED_ITEMS = 10;

  const [limit, setLimit] = useState(INITIAL_NUMBER_OF_FEED_ITEMS);
  const [feedLimitReached, setFeedLimitReached] = useState(false);
  const [feed, setFeed] = useState<(Post | Photo)[]>([]);
  const [feedLoading, setFeedLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/feed?id=${session?.user.id}?offset=0&limit=${limit}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if(data) {
        setFeed(data.paginatedItems);
        setFeedLoading(false);
        if(data.paginatedItems.length < limit) {
          setFeedLimitReached(true);
        }
      }
    })
    .catch((e: Error) => {
      console.log("response error: ", e);
    });
  }, [])

  const loadMoreFeed = (limit: number) => {
    setLimit(limit + 10);
    fetch(`/api/feed?id=${session?.user.id}?offset=0&limit=${limit}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if(data) {
        setFeed(data.paginatedItems);
        if(data.paginatedItems.length < limit) {
          setFeedLimitReached(true);
        }
      }
    })
    .catch((e: Error) => {
      console.log("response error: ", e);
    });
  }

  return (
    <ul className="flex flex-col justify-center gap-4 max-w-lg m-auto">
      {feedLoading ?
        <li className='text-2xl text-center'>Content loading, please wait.</li>
      :
        feed.length > 0 ?
          feed.map((item: Post | Photo) => (
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
    {!feedLoading &&
      <Button 
        label={!feedLimitReached ? "Load More Feed" : "No More Feed to Display"} 
        clickEvent={() => loadMoreFeed(limit + 10)} 
        isDisabled={!feedLimitReached ? false : true} 
      />
    }
    </ul>
    
  )
}

export default Feed;