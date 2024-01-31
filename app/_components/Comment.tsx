"use client"

import Link from "next/link";
import { submitLike } from "../actions";

// Components
import Button from "./Button";

type CommentProps = {
  id: number;
  author: {id: number, email: string};
  createdAt: string;
  content: string;
  likes: number
}

const Comment: React.FC<CommentProps> = ({ id, author, createdAt, content, likes }) => {
  return (
    <li className="px-3 py-1 bg-[#89CFF0] dark:bg-[#034694] rounded-lg shadow-md dark:shadow-none">
      <div className="grid grid-cols-6">
        <Link href={`/user/${author.id}/posts`} className="col-start-1 col-end-4 text-blue-700 dark:text-blue-300">{author.email}</Link>
        <div className="col-end-7 col-span-3 text-right">{createdAt}</div>
        <div className="col-start-1 col-end-7 text-center min-h-[3rem]">{content}</div>
        <div className="col-start-1 col-end-4">
          <Button label="Like" fontAwesomeIcon="fa-thumbs-up" isDisabled={true} clickEvent={() => submitLike("Comment", id)} /> {/* Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04) */}
        </div>
        <div className="col-end-7 col-span-3 text-right">{likes} Likes</div>
      </div>
    </li>
  );
};

export default Comment;