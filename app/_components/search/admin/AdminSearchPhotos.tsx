'use client'

import Link from "next/link";
import { useState } from "react";

import { deletePhoto } from "../../../actions";

// Constants (Only temporary while backend is disabled)
import { photos, adminTableHeadersPhotos } from "../../../_constants";

// Components
import Button from "../../Button";
import Photo from "../../Photo";

const AdminSearchPhotos = ({ query } : { query: string; }) => {
  const [expandedPhotoId, setExpandedPhotoId] = useState<number | null>(null);
  const [hoveredPhoto, setHoveredPhoto] = useState<typeof photos[number] | null>(null);

  const handleExpandImage = (photoId: number) => {
    setExpandedPhotoId(photoId === expandedPhotoId ? null : photoId);
  };

  const filteredPhotos = photos.filter((photo) => {
    return photo.content.includes(query);
  });

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
          {adminTableHeadersPhotos.map((header, i) => (
            <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredPhotos.length > 0 ?
          filteredPhotos.map((photo, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {photo.id}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              <Link href={`/user/${photo.author.id}/photos`} className="text-blue-700">{photo.author.username}</Link>
            </td>

            <td
              className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 overflow-hidden"
              style={{ maxWidth: "50px" }}
              onMouseEnter={() => setHoveredPhoto(photo)}
              onMouseLeave={() => setHoveredPhoto(null)}
            >
              {hoveredPhoto === photo ? (
                <div className="absolute z-10 bg-white border border-gray-200 shadow-lg rounded-lg p-4">
                  {photo.content}
                </div>
              ) : (
                <div className="overflow-hidden truncate">{photo.content}</div>
              )}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {expandedPhotoId === photo.id ?
                <div className="w-52 md:w-72">
                  <Link href={`/photo/${photo.id}`}>
                    <Photo id={photo.id} src={photo.src} description={photo.description} commentsLink={false} />
                  </Link>
                </div>
                :
                <Button label="Show Image" fontAwesomeIcon="fa-image" clickEvent={() => handleExpandImage(photo.id)} isDisabled={false} />
              }
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {photo.createdAt}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              <Button label="Delete" isDisabled={true} fontAwesomeIcon="fa-trash" clickEvent={() => deletePhoto(photo.id)} />
            </td>
          </tr>
          ))
          :
          <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" colSpan={adminTableHeadersPhotos.length}>
              Search found no photos!
            </td>
          </tr>
        }
      </tbody>
    </table>
  )
}

export default AdminSearchPhotos;