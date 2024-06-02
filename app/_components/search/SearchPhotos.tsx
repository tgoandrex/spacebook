import prisma from "../../../prisma/lib/prisma";

// Components
import Photo from "../Photo";

const SearchPhotos = async ({ query } : { query: string; }) => {
  const filteredPhotos = await prisma.photo.findMany({
    where: {
      content: {
        contains: query,
        mode: 'insensitive'
      }
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
    <ul className="flex flex-col justify-center gap-4 max-w-lg m-auto py-8">
      {filteredPhotos.length > 0 ?
        filteredPhotos.map((photo) => (
          <Photo 
            key={photo.id} 
            id={photo.author.id} 
            url={photo.url} 
            author={photo.author} 
            likes={photo.likes}
            createdAt={photo.createdAt}
            content={photo.content}
            comments={photo.comments}
            commentsLink={true}
          />
        ))
        :
        <div className='text-2xl text-center'>Search found no photos!</div>
      }
    </ul>
  )
}

export default SearchPhotos;