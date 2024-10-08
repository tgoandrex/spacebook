"use client"

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

// Components
import Comment from "./Comment";
import Button from "./Button";

// Constants
import { getRelativeTime } from "../_constants";

type Comment = {
  id: number;
  content: string;
  createdAt: Date;
  author: { id: number; username: string };
  likes: { userId: number; commentId: number; createdAt: Date; }[];
};

type PhotoProps = {
  id: number;
  url: string;
  author?: {id: number, username: string};
  createdAt?: Date;
  content?: string;
  likes?: { userId: number; photoId: number; createdAt: Date; }[];
  comments?: Comment[];
  commentsLink: Boolean;
}

const Photo: React.FC<PhotoProps> = ({ id, url, author, createdAt, content, likes, comments, commentsLink }) => {
  const { data: session } = useSession();
  
  const LoggedInUserLikes = (likedList: number[], loggedInUserId: number) => {
    return likedList.includes(loggedInUserId);
  };

  const [likedUserIds] = useState<number[]>(likes ? likes.map(like => like.userId) : []);
  const [isLikedByLoggedInUser, setIsLikedByLoggedInUser] = useState<boolean>(LoggedInUserLikes(likedUserIds, Number(session?.user.id)));
  const [likesCount, setLikesCount] = useState<number>(likes ? likes.length : 0);
  const [expandedDeleteButton, setExpandedDeleteButton] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const reducedComments = comments ? comments.slice(0, 3) : [];

  const submitLike = async (userId: number, postId: number) => {
    await fetch(`/api/like`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "Photo",
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

  const removeLike = async (userId: number, photoId: number) => {
    await fetch(`/api/like?id=${photoId}&userId=${userId}&type=Photo`, {
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

  const deletePhoto = async (photoId: number) => {
    await fetch(`/api/photo?id=${photoId}`, {
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
    <div className="px-2 py-2 bg-white dark:bg-slate-700 rounded-lg shadow-lg dark:shadow-none">
      {!isDeleted ?
        <>
          <Image src={url} alt={""} width={500} height={500} />
          {author && content && createdAt && likes &&
            <div className="grid grid-cols-6 bg-[#89CFF0] dark:bg-[#034694] rounded-b-lg mb-1 shadow-md dark:shadow-none px-3 py-1">
              <Link href={`/user/${author.id}/posts`} className="col-start-1 col-end-4 text-blue-700 dark:text-blue-300">{author.username}</Link>
              <div className="col-end-7 col-span-3 text-right">{getRelativeTime(new Date(createdAt))}</div>
              <div className="col-start-1 col-end-7 text-center min-h-[5rem]">{content}</div>
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
                      <Button label="Delete" fontAwesomeIcon="fa-trash" isDisabled={false} clickEvent={() => deletePhoto(id)} />
                      <Button label="Cancel" isDisabled={false} clickEvent={() => setExpandedDeleteButton(false)} />
                    </div>
                  :
                    <Button label="Delete" isDisabled={false} clickEvent={() => setExpandedDeleteButton(true)} />
                :
                  <Link href={`/photo/${id}/report`} className="text-blue-700 dark:text-blue-300">Report</Link>
                }
              </div>
            </div>
          }
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
                    <Link href={`/photo/${id}`} className="block text-center text-blue-700 dark:text-blue-300">View All Comments</Link>
                  :
                    <Link href={`/photo/${id}`} className="block text-center text-blue-700 dark:text-blue-300">Add a Comment</Link>
                  }
                </>
              }
            </>
          }
        </>
      :
        <div className="text-center">Photo and associated Comments (if any) were deleted</div>
      }
    </div>
  )
}

export default Photo;