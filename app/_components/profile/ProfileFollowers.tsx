'use client'

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

// Components
import User from '../User';

interface Follower {
  id: number;
  username: string;
  profilePhoto?: string;
}

const ProfileFollowers = () => {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [followersLoading, setFollowersLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    fetch(`/api/follower?id=${params.id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if(data.followers) {
        const followers: Follower[] = data.followers.map((follower: Follower) => ({
          id: follower.id,
          username: follower.username,
          profilePhoto: follower.profilePhoto
        }));
        setFollowers(followers);
        setFollowersLoading(false);
      }
    })
    .catch((e: Error) => {
      console.log("response error: ", e);
    });
  }, [followers])

  return (
    <ul className="flex flex-wrap justify-center gap-4 md:gap-8">
      {followersLoading ?
        <li className='text-2xl text-center'>Content loading, please wait.</li>
      :
      followers.length > 0 ?
        followers.map((follower) => (
          <User 
            key={follower.id}  
            id={follower.id} 
            username={follower.username}
            profilePhoto={follower.profilePhoto}
          />
        ))
      :
        <li className='text-2xl text-center'>Followers not found!</li>
      }
    </ul>
  )
}

export default ProfileFollowers;