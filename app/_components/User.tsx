import Image from "next/image";
import Link from "next/link";

import blankProfilePicture from "../_assets/images/blank-profile-picture.jpg";

type UserProps = {
  id: number;
  username: string;
  profilePhoto?: string;
}

const User: React.FC<UserProps> = ({ id, username, profilePhoto }) => {
  return (
    <div className="px-6 py-2 bg-white dark:bg-slate-700 rounded-lg shadow-lg dark:shadow-none flex gap-4">
      <Image
        src={profilePhoto ? profilePhoto : blankProfilePicture}
        width={75}
        height={75}
        className="rounded-full"
        alt="Profile picture"
      />
      <Link href={`/user/${id}/posts`} className="flex items-center text-blue-700 dark:text-blue-300">{username}</Link>
    </div>
  )
}

export default User;