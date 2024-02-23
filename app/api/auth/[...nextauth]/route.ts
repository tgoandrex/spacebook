import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "Andrew", username: "tgoandrex" };

        if(user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  session: { strategy: "jwt" }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };