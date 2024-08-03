import prisma from "../../../prisma/lib/prisma";

// Components
import User from "../User";

const SearchUsers = async({ query, page, pageSize } : { query: string, page: number, pageSize: number; }) => {
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
      profilePhoto: true
    },
    orderBy: {
      username: "asc"
    },
    skip: offset,
    take: pageSize
  });

  return (
    filteredUsers.length > 0 ?
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[250px] sm:max-w-[450px] m-auto py-8">
        {filteredUsers.map((user) => (
          user.profilePhoto ?
            <User 
              key={user.id}  
              id={user.id} 
              username={user.username}
              profilePhoto={user.profilePhoto}
            />
          :
            <User 
              key={user.id}  
              id={user.id} 
              username={user.username}
            />
        ))}
      </ul>
    :
      <div className='text-2xl text-center'>Search found no users!</div>
  )
}

export default SearchUsers;