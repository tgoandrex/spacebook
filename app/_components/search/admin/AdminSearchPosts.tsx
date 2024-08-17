import Link from "next/link";
import { revalidatePath } from "next/cache";

import prisma from "../../../../prisma/lib/prisma";

// Constants
import { adminTableHeadersPostsAndComments } from "../../../_constants";

// Components
import Button from "../../Button";

const AdminSearchPosts = async ({ query, page, pageSize } : { query: string, page: number, pageSize: number;  }) => {
  const offset = (page - 1) * pageSize;

  const filteredPosts = await prisma.post.findMany({
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

  const deletePost = async (formData: FormData) => {
    "use server"

    const postId = formData.get("postId");
    
    try {
      await prisma.post.delete({
        where: {
          id: Number(postId)
        }
      });
      revalidatePath('/');
    } catch (e) {
      console.log('Failed to delete post');
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
        {filteredPosts.length > 0 ?
          filteredPosts.map((post, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                <Link href={`/post/${post.id}`} className="text-blue-700">{post.id}</Link>
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                <Link href={`/user/${post.author.id}/posts`} className="text-blue-700">{post.author.username}</Link>
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                {post.content}
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                {post.createdAt.toLocaleString()}
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                {post.author.role === "User" ?
                  <form action={deletePost}>
                    <input id="postId" name="postId" value={post.id} className="hidden" readOnly />
                    <Button label="Delete" isDisabled={false} fontAwesomeIcon="fa-trash" />
                  </form>
                :
                  <div>This Post belongs to an Admin!</div>
                }
              </td>
            </tr>
          ))
          :
          <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" colSpan={adminTableHeadersPostsAndComments.length}>
              Search found no posts!
            </td>
          </tr>
        }
      </tbody>
    </table>
  )
}

export default AdminSearchPosts;