import { getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { User } from ".prisma/client";
import { SignInJwtAccessToken } from "@/lib/JWT";
import { TUser } from "@/types/globalType";

const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
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

        const res: User | any = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
          include: {
            role: true,
          },
        });

        const comparePass = await compare(credentials.password, res.password);

        if (res && comparePass) {
          const token = SignInJwtAccessToken({
            email: res.email,
            name: res.name,
          });
          return {
            id: res.id,
            name: res?.name,
            email: res.email,
            role: res.role.name,
            accessToken: token,
          };
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
        },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      return dbUser;
    },
  },
};

const getAuthSession = () => getServerSession(authOptions);

export { authOptions, getAuthSession };
