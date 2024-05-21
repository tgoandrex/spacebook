"use client"

import Image from "next/image";
import Link from "next/link";
import { submitLike } from "../actions";

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
  const reducedComments = comments ? comments.slice(0, 3) : [];

  return (
    <div className="px-2 py-2 bg-white dark:bg-slate-700 rounded-lg shadow-lg dark:shadow-none">
      <Image src={url} alt={""} width={500} height={500} />
      {author && content && createdAt && likes &&
        <div className="grid grid-cols-6 bg-[#89CFF0] dark:bg-[#034694] rounded-b-lg mb-1 shadow-md dark:shadow-none px-3 py-1">
          <Link href={`/user/${author.id}/posts`} className="col-start-1 col-end-4 text-blue-700 dark:text-blue-300">{author.username}</Link>
          <div className="col-end-7 col-span-3 text-right">{new Date(createdAt).toLocaleString()}</div>
          <div className="col-start-1 col-end-7 text-center min-h-[5rem]">{content}</div>
          <div className="col-start-1 col-end-4">
            <Button label={`${likes.length}`} fontAwesomeIcon="fa-thumbs-up" isDisabled={true} clickEvent={() => submitLike("Photo", id)} /> {/* Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04) */}
          </div>
          <div className="col-end-7 col-span-3 text-right">
            <Link href={`/photo/${id}/report`} className="text-blue-700 dark:text-blue-300">Report</Link>
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
    </div>
  )
}

export default Photo;