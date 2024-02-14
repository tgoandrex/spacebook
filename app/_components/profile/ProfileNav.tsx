'use client'

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from "next/image";

import blankProfilePicture from "../../_assets/images/blank-profile-picture.jpg"

import { profileNavLinks, users } from '../../_constants';

const ProfileNav = () => {
  const pathname = usePathname();
  const pathnameEnd = pathname.substring(pathname.lastIndexOf('/') + 1);

  const params = useParams();

  const user = users.find(user => user.id === parseInt(params.id));

  return (
    <nav className="dark:bg-gray-700 dark:text-white items-center pb-5">
      {user ?
        <>
          <div className='flex flex-col items-center md:flex-row justify-between gap-4'>
            <div className='text-2xl pl-2 flex flex-col items-center md:flex-row gap-4 mt-5'>
              <Image
                    src={blankProfilePicture}
                    width={150}
                    height={150}
                    className="rounded-full"
                    alt="Profile picture"
                  />
              {user.email}
            </div>
            <div className='md:text-right text-2xl pr-2'>Joined: {user.createdAt}</div>
          </div>
          <ul className="w-full flex justify-around text-center items-end border-b border-stone-600 dark:border-black mt-4">
            {profileNavLinks.map((item) => (
              <li key={item.label} className={`${pathnameEnd === item.href ? "-mb-[.5px] bg-white dark:bg-gray-700 border-t border-r border-l rounded-t border-stone-600 dark:border-black" : "border-none"}`}>
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