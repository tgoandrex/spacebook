"use client"

import Link from "next/link";
import { submitLike } from "../actions";

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
  return (
    <div className="px-3 py-1 w-[85%] min-w-[20rem] bg-[#89CFF0] dark:bg-[#034694] rounded-lg shadow-md dark:shadow-none">
      <div className="grid grid-cols-6">
        <Link href={`/user/${author.id}/posts`} className="col-start-1 col-end-4 text-blue-700 dark:text-blue-300">{author.username}</Link>
        <div className="col-end-7 col-span-3 text-right">{new Date(createdAt).toLocaleString()}</div>
        <div className="col-start-1 col-end-7 text-center min-h-[3rem]">{content}</div>
        <div className="col-start-1 col-end-4">
          <Button label={`${likes.length}`} fontAwesomeIcon="fa-thumbs-up" isDisabled={true} clickEvent={() => submitLike("Comment", id)} /> {/* Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04) */}
        </div>
        <div className="col-end-7 col-span-3 text-right">
          <Link href={`/comment/${id}/report`} className="text-blue-700 dark:text-blue-300">Report</Link>
        </div>
      </div>
    </div>
  );
};

export default Comment;