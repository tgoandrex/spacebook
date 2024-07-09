"use client"

import { useState } from "react";

// Components
import Button from "../../Button";
import Photo from "../../Photo";

const AdminPhotoExpand = ({ id, url }: {id: number, url: string}) => {
  const [expandedPhoto, setExpandedPhoto] = useState(false);

  return (
    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
      {expandedPhoto ?
        <div className="w-52 md:w-72 cursor-pointer" onClick={() => setExpandedPhoto(false)}>
          <Photo id={id} url={url} commentsLink={false} />
        </div>
        :
        <Button label="Show Image" fontAwesomeIcon="fa-image" clickEvent={() => setExpandedPhoto(true)} isDisabled={false} />
      }
    </td>
  )
}

export default AdminPhotoExpand;