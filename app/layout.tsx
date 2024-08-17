import "./globals.css";

import Provider from "./_context/client-provider";
import { auth } from "../auth";


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
  const session = await auth();

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