'use client'

import Link from 'next/link';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { useSession } from "next-auth/react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../api/uploadthing/core";

import blankProfilePicture from "../../_assets/images/blank-profile-picture.jpg";

// Components
import Button from '../Button';

// Constants
import { profileNavLinks } from '../../_constants';

interface Follower {
  id: number;
}

const ProfileNav = () => {
  const { data: session } = useSession();

  const pathname = usePathname();
  const pathnameEnd = pathname.substring(pathname.lastIndexOf('/') + 1);

  const params = useParams();

  const [user, setUser] = useState({
    id: 0,
    username: "",
    fname: "",
    lname: "",
    role: "",
    profilePhoto: "",
    createdAt: new Date()
  });
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");

  const isFollowing = (followersList: { id: number }[], loggedInUserId: number) => {
    return followersList.some(follower => follower.id === loggedInUserId);
  };

  const createProfilePhoto = async (id: number, url: string) => {
    await fetch(`/api/user`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        url: url
      }),
    }).then((res) => {
      return res.json();
    }).then((data) => {
      console.log(data);
    }).catch((e: Error) => {
      console.log("response error: ", e);
    });
  };

  const followUser = async (followerId: number, followingId: number) => {
    await fetch(`/api/follower`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        followerId: followerId,
        followingId: followingId
      }),
    }).then((res) => {
      return res.json();
    }).then((data) => {
      console.log(data);
    }).catch((e: Error) => {
      console.log("response error: ", e);
    });
  };

  const unfollowUser = async (followerId: number, followingId: number) => {
    await fetch(`/api/follower?followerId=${followerId}&followingId=${followingId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      return res.json();
    }).then((data) => {
      console.log(data);
    }).catch((e: Error) => {
      console.log("response error: ", e);
    });
  };
  
  useEffect(() => {
    fetch(`/api/user?id=${params.id}`, {
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
      if(data) {
        setUser({
          id: data.user.id,
          username: data.user.username,
          fname: data.user.fname,
          lname: data.user.lname,
          role: data.user.role,
          profilePhoto: data.user.profilePhoto,
          createdAt: new Date(data.user.createdAt)
        });
        const followers: Follower[] = data.formattedFollowers.map((follower: Follower) => ({
          id: follower.id
        }));
        setFollowers(followers);
        setProfilePhoto(data.user.profilePhoto);
      }
    })
    .catch((e: Error) => {
      console.log("response error: ", e);
    });
  }, [followers])
  
  return (
    <nav className="dark:bg-gray-700 dark:text-white items-center pb-5">
      {user.id !== 0 ?
        <>
          <div className='flex flex-col items-center md:flex-row justify-between gap-4'>
            <div className='text-2xl pl-2 flex flex-col items-center md:flex-row gap-4 mt-5'>
              <div className='flex flex-col items-center gap-4'>
                {showUploadButton ?
                  <div className='w-[150px] h-[150px] flex justify-center'>
                    <UploadButton<OurFileRouter>
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        createProfilePhoto(user.id, res![0].url);
                        setShowUploadButton(false);
                        setProfilePhoto(res![0].url);
                        alert("Upload Completed");
                      }}
                      onUploadError={() => {
                        throw new Error('There was an error');
                      }}
                    />
                  </div>
                :
                <Image
                  src={profilePhoto ? profilePhoto : blankProfilePicture}
                  width={150}
                  height={150}
                  className="rounded-full"
                  alt="Profile picture"
                />
                }
                {Number(session?.user.id) === user.id && (
                  <Button 
                    label={showUploadButton ? "Cancel Change" : "Change Profile Picture"} 
                    clickEvent={() => setShowUploadButton(!showUploadButton)} 
                    isDisabled={false} 
                  />
                )}
              </div>
              {user.role === "Admin" ?
                <span>{user.username} {user.role === "Admin" && "(Admin)"}</span>
              :
              user.username
              }
            </div>
            <div className='flex flex-col gap-2 md:gap-4'>
              <div className='md:text-right text-2xl pr-2'>
                Joined: {user.createdAt.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
              {Number(session?.user.id) !== user.id && (
                isFollowing(followers, Number(session?.user.id)) ? (
                  <Button 
                    label="Unfollow" 
                    fontAwesomeIcon='fa-user-minus' 
                    isDisabled={false} 
                    clickEvent={() => unfollowUser(Number(session?.user.id), user.id)} 
                  />
                ) : (
                  <Button 
                    label="Follow" 
                    fontAwesomeIcon='fa-user-plus' 
                    isDisabled={false} 
                    clickEvent={() => followUser(Number(session?.user.id), user.id)} 
                  />
              ))}
            </div>
          </div>
          <ul className="w-full flex justify-around text-center items-end border-b-2 border-black mt-4">
            {profileNavLinks.map((item) => (
              <li key={item.label} className={`${pathnameEnd === item.href ? "-mb-[1.5px] bg-white dark:bg-gray-700 border-t-2 border-r-2 border-l-2 rounded-t border-black" : "border-none"}`}>
                <Link className={`text-xl text-blue-700 dark:text-blue-300 px-4`} href={`${item.href}`}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </>
        :
        <div className='text-2xl text-center'>User not found!</div>
      }
    </nav>
  )
}

export default ProfileNav;