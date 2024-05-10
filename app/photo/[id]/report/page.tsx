// Components
import Photo from '../../../_components/Photo';
import ReportForm from '../../../_components/forms/ReportCreateForm';

// Constants (Only temporary while backend is disabled)
import { photos } from "../../../_constants";

const ReportPhotoPage = async (props: { params: { id: number; } }) => {

  const photo = photos.find(photo => photo.id === Number(props.params.id));
  return (
    <main className='page-layout'>
      {photo ?
        <>
          <div className="text-center pb-4">
            <span className="text-2xl">Report Photo</span>
          </div>
          <div className='flex justify-center'>
            <div className='w-52 md:w-72'>
              <Photo 
                key={photo.id} 
                id={photo.id} 
                url={photo.url} 
                description={photo.description} 
                author={photo.author} 
                likes={photo.likes}
                createdAt={photo.createdAt}
                content={photo.content}
                commentsLink={false}
              />
            </div>
          </div>
          <ReportForm type={"Photo"} id={photo.id} />
        </>
        :
        <div className='text-2xl text-center'>Photo not found!</div>
      }
    </main>
  )
}

export default ReportPhotoPage;