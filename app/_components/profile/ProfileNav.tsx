'use client'

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from "next/image";
import { submitFollow } from "../../actions";

import blankProfilePicture from "../../_assets/images/blank-profile-picture.jpg"

// Components
import Button from '../Button';

// Constants (Only temporary while backend is disabled)
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
              {user.username}
            </div>
            <div className='flex flex-col gap-2 md:gap-4'>
              <div className='md:text-right text-2xl pr-2'>Joined: {user.createdAt}</div>
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