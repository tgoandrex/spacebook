"use client"

import Link from "next/link";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 

// Components
import Photo from "../Photo";

interface Photo {
  id: number;
  url: string;
  content: string;
  author: {
    id: number;
    username: string;
  };
  authorUsername: string;
  likes: { userId: number; postId: number; createdAt: Date; }[];
  comments?: Comment[];
  createdAt: Date;
}

interface Comment {
  id: number,
  author: {id: number, username: string};
  authorUsername: string;
  createdAt: Date;
  content: string;
  postId: number;
  likes: { userId: number; commentId: number; createdAt: Date; }[];
};

const ProfilePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([{
    id: 0,
    url: "",
    content: "",
    author: { id: 0, username: "" },
    authorUsername: "",
    likes: [],
    comments: [],
    createdAt: new Date()
  }]);

  const params = useParams();

  useEffect(() => {
    fetch(`/api/photo?id=${params.id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if(data.photos) {
        const photos: Photo[] = data.photos.map((photo: Photo) => ({
          id: photo.id,
          content: photo.content,
          url: photo.url,
          author: {
            id: photo.author.id,
            username: photo.author.username
          },
          likes: photo.likes,
          comments: photo.comments,
          createdAt: photo.createdAt
        }));
        setPhotos(photos);
      }
    })
    .catch((e: Error) => {
      console.log("response error: ", e);
    });
  }, [])

  return (
    <ul className="flex flex-wrap justify-center gap-4 md:gap-8">
      {photos[0].id !== 0 &&
        photos.map((item) => (
          <li className="w-52 md:w-72">
            <Link href={`/photo/${item.id}`}>
              <Photo key={item.id} id={item.id} url={item.url} description={item.content} commentsLink={false} />
            </Link>
          </li>
        ))
      }
    </ul>
  )
}

export default ProfilePhotos;