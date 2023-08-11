import { getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { User } from ".prisma/client";
import { SignInJwtAccessToken } from "@/lib/JWT";
import { TUser, Avatar } from "@/types/globalType";
import SignInModel from "@/models/signin";

const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
    signOut: '/signup',
    error: '/*'
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials!");
        }

        const res = await SignInModel.create({
          email: credentials.email,
          password: credentials.password,
        });

        if (res) {
          return res.data;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    redirect({ url, baseUrl }) {
      return `${baseUrl}`;
    },
    session({ session, token }) {
      session.user = { ...(token as TUser) };
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token?.email as string,
        },
        include: {
          role: true,
          profile: true,
        },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role.type,
        roleName: dbUser.role.name,
        avatar: dbUser.profile?.avatar,
      };
    },
  },
};

const getAuthSession = () => getServerSession(authOptions);

export { authOptions, getAuthSession };
