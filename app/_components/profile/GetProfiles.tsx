import prisma from "../../../prisma/lib/prisma";

// Components
import ProfileNav from "./ProfileNav";

const GetProfiles = async () => {
  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      fname: true,
      lname: true,
      role: true,
      profilePhoto: true,
      createdAt: true
    }
  });
  return (
    <ProfileNav users={allUsers} />
  )
}

export default GetProfiles;