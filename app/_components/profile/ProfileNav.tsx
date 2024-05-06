'use client'

import Link from 'next/link';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../api/uploadthing/core";

import { submitFollow } from "../../actions";

import blankProfilePicture from "../../_assets/images/blank-profile-picture.jpg";

// Components
import Button from '../Button';

// Constants
import { profileNavLinks } from '../../_constants';

const ProfileNav = () => {
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
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");

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
      if(data.user) {
        setUser({
          id: data.user.id,
          username: data.user.username,
          fname: data.user.fname,
          lname: data.user.lname,
          role: data.user.role,
          profilePhoto: data.user.profilePhoto,
          createdAt: new Date(data.user.createdAt)
        });
        setProfilePhoto(data.user.profilePhoto);
      }
    })
    .catch((e: Error) => {
      console.log("response error: ", e);
    });
  }, [])
  
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
                        setProfilePhoto(res![0].url)
                        alert("Upload Completed");
                      }}
                      onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                  </div>
                :
                profilePhoto ?
                  <Image
                    src={profilePhoto}
                    width={150}
                    height={150}
                    className="rounded-full"
                    alt="Profile picture"
                  />
                :
                <Image
                    src={blankProfilePicture}
                    width={150}
                    height={150}
                    className="rounded-full"
                    alt="Profile picture"
                  />
                }
                <Button 
                  label={showUploadButton ? "Cancel Change" : "Change Profile Picture"} 
                  clickEvent={() => setShowUploadButton(!showUploadButton)} 
                  isDisabled={false} 
                />
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
              <Button label="Follow" fontAwesomeIcon='fa-user-plus' isDisabled={true} clickEvent={() => submitFollow(user.id, 1)} /> {/* Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04) */}
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