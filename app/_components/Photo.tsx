"use client"

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { submitLike } from "../actions";

// Components
import Comment from "./Comment";
import Button from "./Button";

type Comment = {
  id: number,
  author: {id: number, email: string};
  createdAt: string;
  content: string;
  likes: number;
};

type PhotoProps = {
  id: number;
  src: StaticImageData;
  description: string;
  author?: {id: number, email: string};
  createdAt?: string;
  content?: string;
  likes?: number;
  comments?: Comment[];
  commentsLink: Boolean;
}

const Photo: React.FC<PhotoProps> = ({ id, src, description, author, createdAt, content, likes, comments, commentsLink }) => {
  return (
    <div className="px-2 py-2 bg-white dark:bg-slate-700 rounded-lg shadow-lg dark:shadow-none">
      <Image src={src} alt={description} />
      {author && content &&
        <div className="grid grid-cols-6 bg-[#89CFF0] dark:bg-[#034694] rounded-b-lg mb-1 shadow-md dark:shadow-none px-3 py-1">
          <Link href={`/user/${author.id}/posts`} className="col-start-1 col-end-4 text-blue-700 dark:text-blue-300">{author.email}</Link>
          <div className="col-end-7 col-span-3 text-right">{createdAt}</div>
          <div className="col-start-1 col-end-7 text-center min-h-[5rem]">{content}</div>
          <div className="col-start-1 col-end-4">
            <Button label="Like" fontAwesomeIcon="fa-thumbs-up" isDisabled={true} clickEvent={() => submitLike("Photo", id)} /> {/* Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04) */}
          </div>
          <div className="col-end-7 col-span-3 text-right">{likes} Likes</div>
        </div>
      }
      {comments &&
        <>
          <ul className="flex flex-col items-center gap-1">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                author={comment.author}
                createdAt={comment.createdAt}
                content={comment.content}
                likes={comment.likes}
              />
            ))}
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