// Components
import Follower from "../User";

// Constants (Only temporary while backend is disabled)
import { users } from "../../_constants";

const SearchUsers = async({ query } : { query: string; }) => {
  const filteredUsers = users.filter((user) => {
    return user.username.includes(query);
  });

  return (
    <ul className="flex flex-col justify-center gap-4 max-w-sm m-auto py-8">
      {filteredUsers.length > 0 ?
        filteredUsers.map((user) => (
          <Follower 
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