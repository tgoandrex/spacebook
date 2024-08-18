import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

// Components
import ProfilePosts from "../../../_components/profile/ProfilePosts";

const UserPosts = async () => {
  const session = await auth();

  if(!session?.user) {
    redirect("/");
  }

  return (
    <main className='page-layout'>
      <section>
        <ProfilePosts />
      </section>
    </main>
  )
}

export default UserPosts;