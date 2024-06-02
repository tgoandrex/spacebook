import prisma from "../../../prisma/lib/prisma";

// Components
import User from "../User";

const SearchUsers = async({ query } : { query: string; }) => {

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
    }
  });

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[250px] sm:max-w-[450px] m-auto py-8">
      {filteredUsers.length > 0 ?
        filteredUsers.map((user) => (
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
        ))
        :
        <div className='text-2xl text-center'>Search found no users!</div>
      }
    </ul>
  )
}

export default SearchUsers;