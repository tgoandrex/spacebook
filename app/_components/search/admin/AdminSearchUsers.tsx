"use client"

import Link from "next/link";
import { revalidatePath } from "next/cache";

import prisma from "../../../../prisma/lib/prisma";

// Constants (Only temporary while backend is disabled)
import { users, adminTableHeadersUsers } from "../../../_constants";
import Button from "../../Button";

const AdminSearchUsers = async ({ query } : { query: string; }) => {
  const restrictUser = async (userId: number) => {
    try {
      await prisma.user.update({
        data: {
          restricted: true
        },
        where: {
          id: userId
        }
      });
      revalidatePath('/');
    } catch (e) {
      console.log('Failed to restrict user');
    }
  }
  
  const deleteUser = async (userId: number) => {
    try {
      await prisma.user.delete({
        where: {
          id: userId
        }
      });
      revalidatePath('/');
    } catch (e) {
      console.log('Failed to delete user');
    }
  }

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
              {user.restricted.toString()}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {user.createdAt}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              <Button 
                label={user.restricted === false ? `Restrict User` : `Delete User`} 
                isDisabled={true} 
                fontAwesomeIcon="fa-x" 
                clickEvent={user.restricted === false ? () => restrictUser(user.id) : () => deleteUser(user.id)}
              />
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