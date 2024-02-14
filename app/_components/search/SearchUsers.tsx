// Components
import Follower from "../Follower";

// Constants (Only temporary while backend is disabled)
import { users } from "../../_constants";


const SearchUsers = async({ query } : { query: string; }) => {
  const filteredUsers = users.filter((user) => {
    return user.email.includes(query);
  });

  return (
    <ul className="flex flex-col justify-center gap-4 max-w-lg m-auto py-8">
      {filteredUsers.length > 0 ?
        filteredUsers.map((user) => (
          <Follower 
            key={user.id}  
            id={user.id} 
            email={user.email}
          />
        ))
        :
        <div className='text-2xl text-center'>Search found no users!</div>
      }
    </ul>
  )
}

export default SearchUsers;