"use client"

import { useState } from "react";
import Link from "next/link";

// Components
import Comment from "./Comment";

type Comment = {
  authorEmail: string;
  createdAt: string;
  content: string;
};

type PostProps = {
  id: number,
  authorEmail: string;
  createdAt: string;
  content: string;
  comments: Comment[];
}

const Post: React.FC<PostProps> = ({ id, authorEmail, createdAt, content, comments }) => {
  const [showPost, setShowPost] = useState(true);

  return (
    showPost &&
    <li className="px-6 py-2 bg-white dark:bg-slate-700 rounded-lg shadow-lg dark:shadow-none">
      <div className="flex justify-end mb-1">
        <span className="text-2xl cursor-pointer dark:text-white" onClick={() => setShowPost(false)}>X</span>
      </div>
      <div className="grid grid-cols-6">
        <div className="col-start-1 col-end-4">{authorEmail}</div>
        <div className="col-end-7 col-span-3 text-right">{createdAt}</div>
        <div className="col-start-1 col-end-7 text-center min-h-[4rem]">{content}</div>
      </div>
      <ul className="flex flex-col items-center gap-1">
        {comments.map((comment, index) => (
          <Comment
            key={index}
            authorEmail={comment.authorEmail}
            createdAt={comment.createdAt}
            content={comment.content}
          />
        ))}
      </ul>
      <Link href={`/post/${id}`} className="block text-center text-blue-700 dark:text-blue-300">
        View All Comments
      </Link>
    </li>
  );
};

export default Post;