import prisma from "../../../../prisma/lib/prisma";

import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

// Components
import Photo from '../../../_components/Photo';
import ReportCreateForm from '../../../_components/forms/ReportCreateForm';

const ReportPhotoPage = async (props: { params: { id: string; } }) => {
  const session = await auth();

  if(!session?.user) {
    redirect("/");
  }
  
  const photo = await prisma.photo.findUnique({
    where: {
      id: parseInt(props.params.id)
    },
    include: {
      author: {
        select: {
          id: true,
          username: true
        }
      },
      likes: true
    }
  });

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
                id={photo.id} 
                url={photo.url} 
                author={photo.author} 
                likes={photo.likes}
                createdAt={photo.createdAt}
                content={photo.content}
                commentsLink={false}
              />
            </div>
          </div>
          <ReportCreateForm type={"Photo"} id={photo.id} />
        </>
        :
        <div className='text-2xl text-center'>Photo not found!</div>
      }
    </main>
  )
}

export default ReportPhotoPage;