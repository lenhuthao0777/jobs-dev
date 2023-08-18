import { getServerSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import AuthModel from '@/models/Auth';

const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/signin',
    signOut: '/signup',
    error: '/*',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid Credentials!');
        }

        const res = await AuthModel.login({
          email: credentials.email,
          password: credentials.password,
        });

        if (res.data) {
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
    session({ session, token, user }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role as number;
        session.user.accessToken = token?.accessToken as string;
        session.user.image = token.image as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      const { data } = await AuthModel.me(token?.email as string);

      if (!data) {
        token.id = user!.id;
      }

      return {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role.type,
        roleName: data.role.name,
        accessToken: data.accessToken,
        image: data.profile?.avatar || data?.CompanyProfile?.avatar,
      };
    },
  },
};

const getAuthSession = async () => await getServerSession(authOptions);

export { authOptions, getAuthSession };
