"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

// Components
import Post from "../Post";

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
  const [posts, setPosts] = useState<Post[]>([{
    id: 0,
    content: "",
    author: { id: 0, username: "" },
    authorUsername: "",
    likes: [],
    comments: [],
    createdAt: new Date()
  }]);

  const params = useParams();

  useEffect(() => {
    fetch(`/api/post?id=${params.id}`, {
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
      }
    })
    .catch((e: Error) => {
      console.log("response error: ", e);
    });
  }, [])

  return (
    <ul className="flex flex-col justify-center gap-4 max-w-lg m-auto py-8">
      {posts.length > 0 ?
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
    </ul>
  )
}

export default ProfilePosts;