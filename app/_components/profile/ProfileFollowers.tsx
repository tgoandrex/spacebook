'use client'

import { useParams } from 'next/navigation';

// Components
import Follower from '../Follower';

// Constants (Only temporary while backend is disabled)
import { users } from "../../_constants";

const ProfileFollowers = () => {
  const params = useParams();

  const user = users.find(user => user.id === parseInt(params.id));

  return (
    <ul className="flex flex-wrap justify-center gap-4 md:gap-8">
      {user ?
        user.followers.length > 0 ?
          user.followers.map((follower) => (
            <Follower id={follower.id} email={follower.email} key={follower.id} />
          ))
          :
          <div className='text-2xl text-center'>No followers!</div>
        :
        <div className='text-2xl text-center'>User not found!</div>
      }
    </ul>
  )
}

export default ProfileFollowers;