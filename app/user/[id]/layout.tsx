// Components
import GetProfileInfo from "../../_components/profile/GetProfiles";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <GetProfileInfo />
      {children}
    </>
  )
}