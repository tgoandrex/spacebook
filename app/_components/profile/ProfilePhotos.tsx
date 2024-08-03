"use client"

import Link from "next/link";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 

// Components
import Photo from "../Photo";
import Button from "../Button";

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
  const INITIAL_NUMBER_OF_PHOTOS = 10;

  const [limit, setLimit] = useState(INITIAL_NUMBER_OF_PHOTOS);
  const [photoLimitReached, setPhotoLimitReached] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photosLoading, setPhotosLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    fetch(`/api/photo?id=${params.id}?offset=0&limit=${limit}`, {
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
        setPhotosLoading(false);
        if(photos.length < limit) {
          setPhotoLimitReached(true);
        }
      }
    })
    .catch((e: Error) => {
      console.log("response error: ", e);
    });
  }, [])

  const loadMorePhotos = (limit: number) => {
    setLimit(limit + 10);
    fetch(`/api/photo?id=${params.id}?offset=0&limit=${limit}`, {
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
        if(photos.length < limit) {
          setPhotoLimitReached(true);
        }
      }
    })
    .catch((e: Error) => {
      console.log("response error: ", e);
    });
  }

  return (
    <ul className="flex flex-wrap justify-center gap-4 md:gap-8 py-8">
      {photosLoading ?
        <li className='text-2xl text-center'>Content loading, please wait.</li>
      :
        photos.length > 0 ?
        photos.map((item) => (
          <li key={item.id} className="w-52 md:w-72">
            <Link href={`/photo/${item.id}`}>
              <Photo id={item.id} url={item.url} commentsLink={false} />
            </Link>
          </li>
        ))
        :
        <li className='text-2xl text-center'>Photos not found!</li>
      }
      {!photosLoading &&
        <div className="w-full text-center my-4">
          <Button 
            label={!photoLimitReached ? "Load More Photos" : "No More Photos to Display"} 
            clickEvent={() => loadMorePhotos(limit + 10)} 
            isDisabled={!photoLimitReached ? false : true} 
          />
        </div>
      }
    </ul>
  )
}

export default ProfilePhotos;