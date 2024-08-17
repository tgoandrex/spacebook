import Link from "next/link";
import { revalidatePath } from "next/cache";

import prisma from "../../../../prisma/lib/prisma";

// Constants
import { adminTableHeadersPostsAndComments } from "../../../_constants";

// Components
import Button from "../../Button";

const AdminSearchComments = async ({ query, page, pageSize } : { query: string, page: number, pageSize: number;  }) => {
  const offset = (page - 1) * pageSize;

  const filteredComments = await prisma.comment.findMany({
    where: {
      content: {
        contains: query,
        mode: 'insensitive'
      }
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          username: true,
          role: true
        }
      }
    },
    skip: offset,
    take: pageSize
  });

  const deleteComment = async (formData: FormData) => {
    "use server"

    const commentId = formData.get("commentId");
    
    try {
      await prisma.comment.delete({
        where: {
          id: Number(commentId)
        }
      });
      revalidatePath('/');
    } catch (e) {
      console.log('Failed to delete comment');
    }
  }

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
          {adminTableHeadersPostsAndComments.map((header, i) => (
            <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredComments.length > 0 ?
          filteredComments.map((comment, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                {comment.id}
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                <Link href={`/user/${comment.author.id}/posts`} className="text-blue-700">{comment.author.username}</Link>
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                {comment.content}
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                {comment.createdAt.toLocaleString()}
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                {comment.author.role === "User" ?
                  <form action={deleteComment}>
                    <input id="commentId" name="commentId" value={comment.id} className="hidden" readOnly />
                    <Button label="Delete" isDisabled={false} fontAwesomeIcon="fa-trash" />
                  </form>
                :
                  <div>This Comment belongs to an Admin!</div>
                }
              </td>
            </tr>
          ))
          :
          <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" colSpan={adminTableHeadersPostsAndComments.length}>
              Search found no comments!
            </td>
          </tr>
        }
      </tbody>
    </table>
  )
}

export default AdminSearchComments;