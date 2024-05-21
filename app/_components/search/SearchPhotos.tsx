// Components
import Photo from "../Photo";

// Constants (Only temporary while backend is disabled)
import { photos, comments } from "../../_constants";

const SearchPhotos = async ({ query } : { query: string; }) => {
  const filteredPhotos = photos.filter((photo) => {
    return photo.content.includes(query);
  }).map((photo) => ({
    ...photo,
    comments: comments.filter((comment) => photo.commentIds.includes(comment.id))
  }));

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