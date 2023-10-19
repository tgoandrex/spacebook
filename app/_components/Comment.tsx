"use client"

// Components
import Button from "./Button";

type CommentProps = {
  authorEmail: string;
  createdAt: string;
  content: string;
}

const Comment: React.FC<CommentProps> = ({ authorEmail, createdAt, content }) => {
  return (
    <li className="px-3 py-1 bg-[#89CFF0] dark:bg-[#034694] rounded-lg shadow-md dark:shadow-none">
      <div className="grid grid-cols-6">
        <div className="col-start-1 col-end-4">{authorEmail}</div>
        <div className="col-end-7 col-span-3 text-right">{createdAt}</div>
        <div className="col-start-1 col-end-7 text-center min-h-[3rem]">{content}</div>
        <div className="col-start-1 col-end-4"><Button label="Like" fontAwesomeIcon="fa-thumbs-up" isDisabled={true} /></div>
        <div className="col-end-7 col-span-3 text-right">0 Likes</div>
      </div>
    </li>
  );
};

export default Comment;