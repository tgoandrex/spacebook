"use client"

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

// Components
import Button from "./Button";

type CommentProps = {
  id: number;
  content: string;
  createdAt: Date;
  author: { id: number; username: string };
  likes: { userId: number; commentId: number; createdAt: Date; }[];
};

const Comment: React.FC<CommentProps> = ({ id, author, createdAt, content, likes }) => {
  const { data: session } = useSession();
  
  const LoggedInUserLikes = (likedList: number[], loggedInUserId: number) => {
    return likedList.includes(loggedInUserId);
  };

  const [likedUserIds] = useState<number[]>(likes.map(like => like.userId));
  const [isLikedByLoggedInUser, setIsLikedByLoggedInUser] = useState<boolean>(LoggedInUserLikes(likedUserIds, Number(session?.user.id)));
  const [likesCount, setLikesCount] = useState<number>(likes.length);

  const submitLike = async (userId: number, commentId: number) => {
    await fetch(`/api/like`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "Comment",
        id: commentId,
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

  const removeLike = async (userId: number, commentId: number) => {
    await fetch(`/api/like?id=${commentId}&userId=${userId}&type=Comment`, {
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
    <div className="px-3 py-1 w-[85%] min-w-[20rem] bg-[#89CFF0] dark:bg-[#034694] rounded-lg shadow-md dark:shadow-none">
      <div className="grid grid-cols-6">
        <Link href={`/user/${author.id}/posts`} className="col-start-1 col-end-4 text-blue-700 dark:text-blue-300">{author.username}</Link>
        <div className="col-end-7 col-span-3 text-right">{new Date(createdAt).toLocaleString()}</div>
        <div className="col-start-1 col-end-7 text-center min-h-[3rem]">{content}</div>
        <div className="col-start-1 col-end-4">
          {isLikedByLoggedInUser ? (
            <Button label={`${likesCount} (Liked)`} fontAwesomeIcon="fa-thumbs-up" isDisabled={false} clickEvent={() => removeLike(Number(session?.user.id), id)} />
          ) : (
            <Button label={`${likesCount}`} fontAwesomeIcon="fa-thumbs-up" isDisabled={false} clickEvent={() => submitLike(Number(session?.user.id), id)} />
          )}
        </div>
        <div className="col-end-7 col-span-3 text-right">
          <Link href={`/comment/${id}/report`} className="text-blue-700 dark:text-blue-300">Report</Link>
        </div>
      </div>
    </div>
  );
};

export default Comment;