import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

// Components
import ProfileFollowers from "../../../_components/profile/ProfileFollowers";

const UserFollowers = async () => {
  const session = await auth();

  if(!session?.user) {
    redirect("/");
  }

  return (
    <main className='page-layout'>
      <ProfileFollowers />
    </main>
  )
}

export default UserFollowers;