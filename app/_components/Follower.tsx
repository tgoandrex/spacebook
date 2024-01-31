import Image from "next/image";
import Link from "next/link";

import blankProfilePicture from "../_assets/images/blank-profile-picture.jpg";

type FollowerProps = {
  id: number;
  email: String;
}

const Follower: React.FC<FollowerProps> = ({ id, email }) => {
  return (
    <div className="px-6 py-2 bg-white dark:bg-slate-700 rounded-lg shadow-lg dark:shadow-none flex justify-between gap-4">
      <Image
        src={blankProfilePicture}
        width={100}
        height={100}
        className="rounded-full"
        alt="Profile picture"
      />
      <Link href={`/user/${id}/posts`} className="flex items-center text-blue-700 dark:text-blue-300">{email}</Link>
    </div>
  )
}

export default Follower