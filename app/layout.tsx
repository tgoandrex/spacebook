import "./globals.css";

// Components
import Nav from "./_components/Nav";

export const metaData = {
  title: "Spacebook"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className="bg-slate-300">
            <Nav />
            {children}
            <script src="https://kit.fontawesome.com/a0cabf7a73.js" crossOrigin="anonymous"></script>
        </body>
    </html>
  )
}