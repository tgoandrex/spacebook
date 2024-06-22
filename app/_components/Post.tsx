"use client"

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

// Components
import Comment from "./Comment";
import Button from "./Button";

type Comment = {
  id: number;
  content: string;
  createdAt: Date;
  author: { id: number; username: string };
  likes: { userId: number; commentId: number; createdAt: Date; }[];
};

type PostProps = {
  id: number,
  author: {id: number, username: string};
  createdAt: Date;
  content: string;
  likes: { userId: number; postId: number; createdAt: Date; }[];
  comments?: Comment[];
  commentsLink: Boolean;
}

const Post: React.FC<PostProps> = ({ id, author, createdAt, content, likes, comments, commentsLink }) => {
  const { data: session } = useSession();
  
  const LoggedInUserLikes = (likedList: number[], loggedInUserId: number) => {
    return likedList.includes(loggedInUserId);
  };

  const [likedUserIds] = useState<number[]>(likes.map(like => like.userId));
  const [isLikedByLoggedInUser, setIsLikedByLoggedInUser] = useState<boolean>(LoggedInUserLikes(likedUserIds, Number(session?.user.id)));
  const [likesCount, setLikesCount] = useState<number>(likes.length);

  const reducedComments = comments ? comments.slice(0, 3) : [];

  const submitLike = async (userId: number, postId: number) => {
    await fetch(`/api/like`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "Post",
        id: postId,
        userId: userId
      }),
    }).then((res) => {
      return res.json();
    }).then((data) => {
      console.log(data);
      if(data.success) {
        setIsLikedByLoggedInUser(true);
        setLikesCount((prev) => prev + 1);
      }
    }).catch((e: Error) => {
      console.log("response error: ", e);
    });
  };

  const removeLike = async (userId: number, postId: number) => {
    await fetch(`/api/like?id=${postId}&userId=${userId}&type=Post`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      return res.json();
    }).then((data) => {
      console.log(data);
      setIsLikedByLoggedInUser(false);
      setLikesCount((prev) => prev - 1);
    }).catch((e: Error) => {
      console.log("response error: ", e);
    });
  };

  return (
    <div className="px-2 py-2 bg-white dark:bg-slate-700 rounded-lg shadow-lg dark:shadow-none">
      <div className="grid grid-cols-6 bg-[#89CFF0] dark:bg-[#034694] rounded-lg mb-1 shadow-md dark:shadow-none px-3 py-1">
        <Link href={`/user/${author.id}/posts`} className="col-start-1 col-end-4 text-blue-700 dark:text-blue-300">{author.username}</Link>
        <div className="col-end-7 col-span-3 text-right">{new Date(createdAt).toLocaleString()}</div>
        <div className="col-start-1 col-end-7 text-center min-h-[5rem]">{content}</div>
        <div className="col-start-1 col-end-4">
          {isLikedByLoggedInUser ? (
            <Button label={`${likesCount} (Liked)`} fontAwesomeIcon="fa-thumbs-up" isDisabled={false} clickEvent={() => removeLike(Number(session?.user.id), id)} />
          ) : (
            <Button label={`${likesCount}`} fontAwesomeIcon="fa-thumbs-up" isDisabled={false} clickEvent={() => submitLike(Number(session?.user.id), id)} />
          )}
        </div>
        <div className="col-end-7 col-span-3 text-right">
          <Link href={`/post/${id}/report`} className="text-blue-700 dark:text-blue-300">Report</Link>
        </div>
      </div>
      <ul className="flex flex-col items-center gap-1">
      </ul>
      {comments &&
        <>
          <ul className="flex flex-col items-center gap-1">
          {commentsLink ?
            reducedComments.map((comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                author={comment.author}
                createdAt={comment.createdAt}
                content={comment.content}
                likes={comment.likes}
              />
            ))
          :
            comments.map((comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                author={comment.author}
                createdAt={comment.createdAt}
                content={comment.content}
                likes={comment.likes}
              />
            ))
          }
          </ul>
          {commentsLink &&
            <>
              {comments.length > 3 ?
                <Link href={`/post/${id}`} className="block text-center text-blue-700 dark:text-blue-300">View All Comments</Link>
              :
                <Link href={`/post/${id}`} className="block text-center text-blue-700 dark:text-blue-300">Add a Comment</Link>
              }
            </>
          }
        </>
      }
    </div>
  );
};

export default Post;