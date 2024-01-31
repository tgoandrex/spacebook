// Components
import ProfileNav from "../../_components/ProfileNav"

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <ProfileNav />
      {children}
    </>
  )
}