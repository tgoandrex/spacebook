"use client"

import Link from "next/link";
import { useState } from "react";

// Components
import Button from "./Button";

// Constants
import { getRelativeTime } from "../_constants";

type NotificationProps = {
    id: number,
    userUsername: string;
    postId?: number;
    photoId?: number;
    createdAt: Date;
    content: string;
  }

const Notification: React.FC<NotificationProps> = ({ id, content, postId, photoId, createdAt }) => {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const deleteNotification = async (notificationId: number) => {
    await fetch(`/api/notification?id=${notificationId}`, {
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
    <>
      {!isDeleted ?
        <div className="flex flex-col">
          {postId ?
            <div onClick={() => deleteNotification(id)}>
              <Link href={`/post/${postId}`} className="underline">{content}</Link>
            </div>
          :
            <div onClick={() => deleteNotification(id)}>
              <Link href={`/photo/${photoId}`} className="underline">{content}</Link>
            </div>
          }
          <div className="flex items-center justify-between pt-2">
            <div>{getRelativeTime(new Date(createdAt))}</div>
            <Button label="Delete" clickEvent={() => deleteNotification(id)} isDisabled={false} />
          </div>
        </div>
      :
        <div className="text-center">Notification deleted</div>
      }
    </>
  )
}

export default Notification;