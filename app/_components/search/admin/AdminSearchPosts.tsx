'use client'

import Link from "next/link";
import { useState } from "react";

import { deletePost } from "../../../actions";

// Constants (Only temporary while backend is disabled)
import { posts, adminTableHeadersPosts } from "../../../_constants";
import Button from "../../Button";

const AdminSearchPosts = ({ query } : { query: string; }) => {
  const [hoveredPost, setHoveredPost] = useState<typeof posts[number] | null>(null);
  
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
              <td
                className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 overflow-hidden"
                style={{ maxWidth: "50px" }}
                onMouseEnter={() => setHoveredPost(post)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                {hoveredPost === post ? (
                  <div className="absolute z-10 bg-white border border-gray-200 shadow-lg rounded-lg p-4">
                    {post.content}
                  </div>
                ) : (
                  <div className="overflow-hidden truncate">{post.content}</div>
                )}
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