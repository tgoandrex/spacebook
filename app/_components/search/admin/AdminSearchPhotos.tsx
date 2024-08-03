import Link from "next/link";
import { revalidatePath } from "next/cache";

import prisma from "../../../../prisma/lib/prisma";

// Constants
import { adminTableHeadersPhotos } from "../../../_constants";

// Components
import Button from "../../Button";
import AdminPhotoExpand from "./AdminPhotoExpand";

const AdminSearchPhotos = async ({ query, page, pageSize } : { query: string, page: number, pageSize: number;  }) => {
  const offset = (page - 1) * pageSize;

  const filteredPhotos = await prisma.photo.findMany({
    where: {
      content: {
        contains: query,
        mode: 'insensitive'
      }
    },
    select: {
      id: true,
      content: true,
      url: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          username: true
        }
      }
    },
    skip: offset,
    take: pageSize
  });

  const deletePhoto = async (formData: FormData) => {
    "use server"

    const photoId = formData.get("photoId");

    try {
      await prisma.photo.delete({
        where: {
          id: Number(photoId)
        }
      });
      revalidatePath('/');
    } catch (e) {
      console.log('Failed to delete photo');
    }
  }

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
              <Link href={`/photo/${photo.id}`} className="text-blue-700">{photo.id}</Link>
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              <Link href={`/user/${photo.author.id}/photos`} className="text-blue-700">{photo.author.username}</Link>
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {photo.content}
            </td>
            <AdminPhotoExpand id={photo.id} url={photo.url} />
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {photo.createdAt.toLocaleString()}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              <form action={deletePhoto}>
                <input id="photoId" name="photoId" value={photo.id} className="hidden" readOnly />
                <Button label="Delete" isDisabled={false} fontAwesomeIcon="fa-trash" />
              </form>
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