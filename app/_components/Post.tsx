"use client"

import { useState } from "react";
import Link from "next/link";
import { submitLike } from "../actions";

// Components
import Comment from "./Comment";
import Button from "./Button";

type Comment = {
  id: number,
  authorEmail: string;
  createdAt: string;
  content: string;
  likes: number;
};

type PostProps = {
  id: number,
  authorEmail: string;
  createdAt: string;
  content: string;
  likes: number;
  comments: Comment[];
}

const Post: React.FC<PostProps> = ({ id, authorEmail, createdAt, content, likes, comments }) => {
  const [showPost, setShowPost] = useState(true);

  return (
    showPost &&
    <li className="px-6 py-2 bg-white dark:bg-slate-700 rounded-lg shadow-lg dark:shadow-none">
      <div className="flex justify-end mb-1">
        <span className="text-2xl cursor-pointer dark:text-white" onClick={() => setShowPost(false)}>X</span>
      </div>
      <div className="grid grid-cols-6 bg-[#89CFF0] dark:bg-[#034694] rounded-lg mb-1 shadow-md dark:shadow-none px-3 py-1">
        <div className="col-start-1 col-end-4">{authorEmail}</div>
        <div className="col-end-7 col-span-3 text-right">{createdAt}</div>
        <div className="col-start-1 col-end-7 text-center min-h-[5rem]">{content}</div>
        <div className="col-start-1 col-end-4">
          <Button label="Like" fontAwesomeIcon="fa-thumbs-up" isDisabled={true} clickEvent={() => submitLike("Post", id)} /> {/* Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04) */}
        </div>
        <div className="col-end-7 col-span-3 text-right">{likes} Likes</div>
      </div>
      <ul className="flex flex-col items-center gap-1">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            authorEmail={comment.authorEmail}
            createdAt={comment.createdAt}
            content={comment.content}
            likes={comment.likes}
          />
        ))}
      </ul>
      <Link href={`/post/${id}`} className="block text-center text-blue-700 dark:text-blue-300">View All Comments</Link>
    </li>
  );
};

export default Post;