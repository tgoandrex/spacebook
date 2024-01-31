'use client'

import { useParams } from 'next/navigation';

// Components
import Photo from '../../_components/Photo';
import CommentForm from '../../_components/forms/CommentForm';

// Constants (Only temporary while backend is disabled)
import { photos } from "../../_constants";

const PhotoPage = () => {
  const params = useParams();

  const photo = photos.find(photo => photo.id === Number(params.id));
  return (
    <main className="page-layout">
      {photo ?
        <>
          <div className='flex justify-center flex-wrap'>
            <Photo 
              key={photo.id} 
              id={photo.author.id} 
              src={photo.src} 
              description={photo.description} 
              author={photo.author} 
              likes={photo.likes}
              createdAt={photo.createdAt}
              content={photo.content}
              comments={photo.comments}
              commentsLink={false}
            />
          </div>
          <CommentForm />
        </>
        :
        <div className='text-2xl text-center'>Photo not found!</div>
      }
    </main>
  )
}

export default PhotoPage;