'use client'

import Link from "next/link";

// Constants (Only temporary while backend is disabled)
import { users, adminTableHeadersUsers } from "../../../_constants";
import Button from "../../Button";

const AdminSearchUsers = ({ query } : { query: string; }) => {
  const filteredUsers = users.filter((user) => {
    return user.username.includes(query);
  });

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
          {adminTableHeadersUsers.map((header, i) => (
            <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredUsers.length > 0 ?
          filteredUsers.map((user, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {user.id}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              <Link href={`/user/${user.id}/posts`} className="text-blue-700">{user.username}</Link>
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {user.createdAt}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              <Button label="Ban User" isDisabled={true} fontAwesomeIcon="fa-x" />
            </td>
          </tr>
          ))
          :
          <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" colSpan={adminTableHeadersUsers.length}>
              Search found no users!
            </td>
          </tr>
        }
      </tbody>
    </table>
  )
}

export default AdminSearchUsers;