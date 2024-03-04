'use client'

import { useParams } from 'next/navigation';

// Components
import Photo from '../../../_components/Photo';
import ReportForm from '../../../_components/forms/ReportForm';

// Constants (Only temporary while backend is disabled)
import { photos } from "../../../_constants";

const ReportPhotoPage = () => {
  const params = useParams();

  const photo = photos.find(photo => photo.id === Number(params.id));
  return (
    <main className='page-layout'>
      {photo ?
        <>
          <div className='flex justify-center'>
            <div className='w-52 md:w-72'>
              <Photo 
                key={photo.id} 
                id={photo.id} 
                src={photo.src} 
                description={photo.description} 
                author={photo.author} 
                likes={photo.likes}
                createdAt={photo.createdAt}
                content={photo.content}
                commentsLink={false}
              />
            </div>
          </div>
          <ReportForm />
        </>
        :
        <div className='text-2xl text-center'>Photo not found!</div>
      }
    </main>
  )
}

export default ReportPhotoPage;