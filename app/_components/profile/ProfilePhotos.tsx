import Link from "next/link";

// Components
import Photo from "../Photo";

// Constants (Only temporary while backend is disabled)
import { photos, comments } from "../../_constants/index";

const ProfilePhotos = () => {
  return (
    <ul className="flex flex-wrap justify-center gap-4 md:gap-8">
      {photos.map((item) => (
        <li className="w-52 md:w-72">
          <Link href={`/photo/${item.id}`}>
            <Photo key={item.id} id={item.id} src={item.src} description={item.description} commentsLink={false} />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ProfilePhotos;