"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

// Components
import Post from "../Post";
import Button from '../Button';

interface Post {
  id: number;
  content: string;
  author: {
    id: number;
    username: string;
  };
  authorUsername: string;
  likes: { userId: number; postId: number; createdAt: Date; }[];
  comments?: Comment[];
  createdAt: Date;
}

interface Comment {
  id: number,
  author: {id: number, username: string};
  authorUsername: string;
  createdAt: Date;
  content: string;
  postId: number;
  likes: { userId: number; commentId: number; createdAt: Date; }[];
};

const ProfilePosts = () => {
  const INITIAL_NUMBER_OF_POSTS = 10;

  const [limit, setLimit] = useState(INITIAL_NUMBER_OF_POSTS);
  const [postLimitReached, setPostLimitReached] = useState(false);
  const [posts, setPosts] = useState<Post[]>([{
    id: 0,
    content: "",
    author: { id: 0, username: "" },
    authorUsername: "",
    likes: [],
    comments: [],
    createdAt: new Date()
  }]);
  const [postsLoading, setPostsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    fetch(`/api/post?id=${params.id}?offset=0&limit=${limit}`, {
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
      if(data.posts) {
        const posts: Post[] = data.posts.map((post: Post) => ({
          id: post.id,
          content: post.content,
          author: {
            id: post.author.id,
            username: post.author.username
          },
          likes: post.likes,
          comments: post.comments,
          createdAt: post.createdAt
        }));
        setPosts(posts);
        setPostsLoading(false);
        if(posts.length < limit) {
          setPostLimitReached(true);
        }
      }
    })
    .catch((e: Error) => {
      console.log("response error: ", e);
    });
  }, [])

  const loadMorePosts = (limit: number) => {
    setLimit(limit + 10);
    fetch(`/api/post?id=${params.id}?offset=0&limit=${limit}`, {
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
      if(data.posts) {
        const posts: Post[] = data.posts.map((post: Post) => ({
          id: post.id,
          content: post.content,
          author: {
            id: post.author.id,
            username: post.author.username
          },
          likes: post.likes,
          comments: post.comments,
          createdAt: post.createdAt
        }));
        setPosts(posts);
        if(posts.length < limit) {
          setPostLimitReached(true);
        }
      }
    })
    .catch((e: Error) => {
      console.log("response error: ", e);
    });
  }

  return (
    <>
      <ul className="flex flex-col justify-center gap-4 max-w-lg m-auto py-8">
        {postsLoading ?
          <li className='text-2xl text-center'>Content loading, please wait.</li>
        :
        posts.length > 0 ?
          posts.map((post) => (
            post.id !== 0 &&
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
          ))
        :
          <li className='text-2xl text-center'>Posts not found!</li>
        }
        {!postsLoading &&
          <Button 
            label={!postLimitReached ? "Load More Posts" : "No More Posts to Display"} 
            clickEvent={() => loadMorePosts(limit + 10)} 
            isDisabled={!postLimitReached ? false : true} 
          />
        }
      </ul>
    </>
  )
}

export default ProfilePosts;