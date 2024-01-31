import "./globals.css";

import Provider from "./_context/client-provider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route"

// Components
import Nav from "./_components/Nav";

export const metadata = {
  title: "Spacebook"
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
        <body>
          <Provider session={session}>
            <Nav />
            {children}
            <script src="https://kit.fontawesome.com/a0cabf7a73.js" crossOrigin="anonymous"></script>
          </Provider>
        </body>
    </html>
  )
}