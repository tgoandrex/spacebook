import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

// Components
import ProfilePhotos from "../../../_components/profile/ProfilePhotos";

const UserPhotos = async () => {
  const session = await auth();

  if(!session?.user) {
    redirect("/");
  }

  return (
    <main className='page-layout'>
      <section>
        <ProfilePhotos />
      </section>
    </main>
  )
}

export default UserPhotos;