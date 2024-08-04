import prisma from "../../../prisma/lib/prisma";

// Components
import Photo from "../Photo";

const SearchPhotos = async({ query, page, pageSize } : { query: string, page: number, pageSize: number;  }) => {
  const offset = (page - 1) * pageSize;

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
    },
    orderBy: {
      createdAt: 'desc'
    },
    skip: offset,
    take: pageSize
  });

  return (
    filteredPhotos.length > 0 ?
      <ul className="flex flex-col justify-center gap-4 max-w-lg m-auto">
        {filteredPhotos.map((photo) => (
          <Photo 
            key={photo.id} 
            id={photo.id} 
            url={photo.url} 
            author={photo.author} 
            likes={photo.likes}
            createdAt={photo.createdAt}
            content={photo.content}
            comments={photo.comments}
            commentsLink={true}
          />
        ))}
      </ul>
    :
      <div className='text-2xl text-center'>Search found no photos!</div>
  )
}

export default SearchPhotos;