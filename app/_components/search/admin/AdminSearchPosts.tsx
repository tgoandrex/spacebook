'use client'

import Link from "next/link";

import { deletePost } from "../../../actions";

// Constants (Only temporary while backend is disabled)
import { posts, adminTableHeadersPosts } from "../../../_constants";
import Button from "../../Button";

const AdminSearchPosts = ({ query } : { query: string; }) => {
  const filteredPosts = posts.filter((post) => {
    return post.content.includes(query);
  });

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
          {adminTableHeadersPosts.map((header, i) => (
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
              {post.id}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              <Link href={`/user/${post.author.id}/posts`}>{post.author.username}</Link>
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {post.content}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {post.createdAt}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              <Button label="Delete" isDisabled={true} fontAwesomeIcon="fa-trash" clickEvent={() => deletePost(post.id)} />
            </td>
          </tr>
          ))
          :
          <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" colSpan={adminTableHeadersPosts.length}>
              Search found no posts!
            </td>
          </tr>
        }
      </tbody>
    </table>
  )
}

export default AdminSearchPosts;