"use client"

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

// Components
import Button from "./Button";

// Constants
import { getRelativeTime } from "../_constants";

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
  const [expandedDeleteButton, setExpandedDeleteButton] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

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
      if(data.success) {
        setIsLikedByLoggedInUser(false);
        setLikesCount((prev) => prev - 1);
      }
    }).catch((e: Error) => {
      console.log("response error: ", e);
    });
  };

  const deleteComment = async (commentId: number) => {
    await fetch(`/api/comment?id=${commentId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      return res.json();
    }).then((data) => {
      if(data.success) {
        setIsDeleted(true);
      }
    }).catch((e: Error) => {
      console.log("response error: ", e);
    });
  };

  return (
    <div className="px-3 py-1 w-[95%] sm:w-[85%] bg-[#89CFF0] dark:bg-[#034694] rounded-lg shadow-md dark:shadow-none">
      {!isDeleted ?
        <div className="grid grid-cols-6">
          <Link href={`/user/${author.id}/posts`} className="col-start-1 col-end-4 text-blue-700 dark:text-blue-300">{author.username}</Link>
          <div className="col-end-7 col-span-3 text-right">{getRelativeTime(new Date(createdAt))}</div>
          <div className="col-start-1 col-end-7 text-center min-h-[3rem]">{content}</div>
          <div className="col-start-1 col-end-4">
            {isLikedByLoggedInUser ? (
              <Button label={`${likesCount} (Liked)`} fontAwesomeIcon="fa-thumbs-up" isDisabled={false} clickEvent={() => removeLike(Number(session?.user.id), id)} />
            ) : (
              <Button label={`${likesCount}`} fontAwesomeIcon="fa-thumbs-up" isDisabled={false} clickEvent={() => submitLike(Number(session?.user.id), id)} />
            )}
          </div>
          <div className="col-end-7 col-span-3 text-right">
            {Number(session?.user.id) === author.id ?
              expandedDeleteButton ?
                <div className="flex flex-col">
                  <div className="text-center">Are you sure? This can't be undone!</div>
                  <Button label="Delete" fontAwesomeIcon="fa-trash" isDisabled={false} clickEvent={() => deleteComment(id)} />
                  <Button label="Cancel" isDisabled={false} clickEvent={() => setExpandedDeleteButton(false)} />
                </div>
              :
                <Button label="Delete" isDisabled={false} clickEvent={() => setExpandedDeleteButton(true)} />
            :
              <Link href={`/comment/${id}/report`} className="text-blue-700 dark:text-blue-300">Report</Link>
            }
          </div>
        </div>
      :
        <div className="text-center">Comment was deleted</div>
      }
    </div>
  );
};

export default Comment;