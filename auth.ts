import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma/lib/prisma";
import bcrypt from "bcryptjs";

interface ExtendedUser extends User {
  role?: string;
  username?: string;
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(req) {
        const { username, password } = req as { username: string; password: string; };
        const foundUser = await prisma.user.findUnique({
          where: {
            username: username
          }
        });

        if(foundUser) {
          const storedHashedPassword = foundUser.password;

          const passwordMatch = await bcrypt.compare(password, storedHashedPassword);

          if (passwordMatch) {
            const user = { 
              id: foundUser.id.toString(), 
              username: foundUser.username,
              role: foundUser.role
            };
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      const Exteduser: ExtendedUser = user;
      if (Exteduser) {
        token.role = Exteduser.role;
        token.username = Exteduser.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string;
        session.user.id = token.sub as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  }
})