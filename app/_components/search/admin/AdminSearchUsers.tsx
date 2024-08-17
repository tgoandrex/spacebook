import Link from "next/link";
import { revalidatePath } from "next/cache";

import prisma from "../../../../prisma/lib/prisma";

// Constants
import { adminTableHeadersUsers } from "../../../_constants";

// Components
import Button from "../../Button";

const AdminSearchUsers = async ({ query, page, pageSize } : { query: string, page: number, pageSize: number;  }) => {
  const offset = (page - 1) * pageSize;

  const filteredUsers = await prisma.user.findMany({
    where: {
      username: {
        contains: query,
        mode: 'insensitive'
      }
    },
    select: {
      id: true,
      username: true,
      restricted: true,
      createdAt: true,
      role: true
    },
    orderBy: {
      username: "asc"
    },
    skip: offset,
    take: pageSize
  });
  
  const restrictUser = async (formData: FormData) => {
    "use server"

    const userId = formData.get("userId");

    try {
      await prisma.user.update({
        data: {
          restricted: true
        },
        where: {
          id: Number(userId)
        }
      });
      revalidatePath('/');
    } catch (e) {
      console.log('Failed to restrict user');
    }
  }

  const unrestrictUser = async (formData: FormData) => {
    "use server"

    const userId = formData.get("userId");

    try {
      await prisma.user.update({
        data: {
          restricted: false
        },
        where: {
          id: Number(userId)
        }
      });
      revalidatePath('/');
    } catch (e) {
      console.log('Failed to unrestrict user');
    }
  }
  
  const deleteUser = async (formData: FormData) => {
    "use server"

    const userId = formData.get("userId");
    
    try {
      await prisma.user.delete({
        where: {
          id: Number(userId)
        }
      });
      revalidatePath('/');
    } catch (e) {
      console.log('Failed to delete user');
    }
  }

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
              {user.createdAt.toLocaleString()}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
            {user.role === "User" ?
              <>
                <form action={user.restricted === false ? restrictUser : unrestrictUser}>
                  <input id="userId" name="userId" value={user.id} className="hidden" readOnly />
                  <Button 
                    label={user.restricted === false ? `Restrict User` : `Unrestrict User`} 
                    isDisabled={false} 
                    fontAwesomeIcon={user.restricted === false ? `fa-x` : `fa-check`}
                  />
                </form>
                <form action={deleteUser}>
                  <input id="userId" name="userId" value={user.id} className="hidden" readOnly />
                  <Button 
                    label="Delete User (WARNING)"
                    isDisabled={false} 
                    fontAwesomeIcon="fa-trash"
                  />
                </form>
              </>
            :
            <div>This user is an Admin!</div>
            }
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