import prisma from "../../../prisma/lib/prisma";

// Components
import Photo from '../../_components/Photo';
import CommentForm from '../../_components/forms/CommentForm';

const PhotoPage = async (props: { params: { id: string; } }) => {
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
      likes: true,
      comments: {
        include: {
          author: {
            select: {
              id: true,
              username: true
            }
          },
          likes: true
        }
      }
    }
  });

  return (
    <main className="page-layout">
      {photo ?
        <>
          <div className='flex justify-center flex-wrap'>
            <Photo 
              id={photo.id} 
              url={photo.url} 
              author={photo.author} 
              likes={photo.likes}
              createdAt={new Date(photo.createdAt)}
              content={photo.content}
              comments={photo.comments}
              commentsLink={false}
            />
          </div>
          <CommentForm type={"Photo"} id={photo.id} />
        </>
        :
        <div className='text-2xl text-center'>Photo not found!</div>
      }
    </main>
  )
}

export default PhotoPage;